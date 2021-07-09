terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.44"
    }
  }
}

provider "aws" {
  profile = "aws_at_sanil_me"
  region  = "ap-south-1"
}

resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
}

resource "aws_internet_gateway" "main_igw" {
  vpc_id = aws_vpc.main.id
}

resource "aws_route_table" "main_rt" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main_igw.id
  }
}

resource "aws_subnet" "public_subnet" {
  vpc_id = aws_vpc.main.id
  cidr_block = "10.0.0.0/16"
  map_public_ip_on_launch = true
  availability_zone = "ap-south-1b" 
}

resource "aws_route_table_association" "rt-assoc" {
  subnet_id = aws_subnet.public_subnet.id
  route_table_id = aws_route_table.main_rt.id
}

resource "aws_key_pair" "main_kp" {
  key_name   = "main_kp"
  public_key = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDLrKuhPB2Y3/5d+TsQ3RyUfTthYqQCln/v6C2v5xqZFycLfo/iK9LEYTRBbRUXx9/At9oCTaHXIRLrCrkjIUAHiCehe0ApQPgZhwecj4P7XekQ7cEL8aLVzgtab3qBwncCnTe3jyEgqUrLs9VOQuBeJEw+Qz/sAStf8h0CXEEuuW58IF3DqPAUVd12wF0OciM0RP/elYtF4UX2a542kg13yhnMCxpybGT3HD+d1ePnKuj2LpMOyKQE5uzCO5HtVQBN6urhCm+A8IJ7VIP05uAUYT4yvcKZ0AoCjhB7f8mYj3TOYidfazVK9MUyp4iq1X3+Isdey/Yz0nnYbjvY0zYYaDff1W6SkZcG9DkF2zCwa+0HD9QXhfAlRIYtZXirWtkqeJ0wgUYpWBaC/a/AUNWqI9KEJFbf1APx64ao7aMabXgksO86h4zH/HDRNtHG6cfen8qtURylpsUEGofXizoMILtK37ZUwPMEOgGTnXNzJeM/6F4KEglhNi6xMzWg980= sanil@sanil"
}

data "aws_iam_role" "main_role" {
  name = "EC2AdminAccess"
}

resource "aws_iam_instance_profile" "main_ip" {
  name = "main_ip"
  role = data.aws_iam_role.main_role.id
}

resource "aws_security_group" "main_sg" {
  name        = "main sg"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port = 22
    to_port = 22
    cidr_blocks = ["0.0.0.0/0"]
    protocol = "tcp"
  }

  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }
}

resource "aws_instance" "main_instance" {
  ami = "ami-0c1a7f89451184c8b"
  iam_instance_profile = aws_iam_instance_profile.main_ip.id
  instance_type = "t2.micro"
  vpc_security_group_ids = [aws_security_group.main_sg.id]
  subnet_id = aws_subnet.public_subnet.id
  key_name = aws_key_pair.main_kp.key_name
}
