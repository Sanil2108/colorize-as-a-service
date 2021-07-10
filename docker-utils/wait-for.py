import sys
import subprocess
import time

tries = 10
sleeptime = 2

print("---------------- Starting health check ---------------- ")


if __name__ == '__main__':
  for i in range(tries):
    failed = False

    for j in range(1, len(sys.argv) - 1):
      try:
        command = [*sys.argv[j].split(" ")]

        output = subprocess.check_output(sys.argv[j], shell = True)

        print("---------------- Successfullly returned from "+sys.argv[j]+" ----------------")
      except Exception as err:
        print("---------------- Command "+sys.argv[j]+" exited with a non zero error code. "+str(err)+" ----------------")
        failed = True

    if not failed:
      process = subprocess.Popen([*sys.argv[len(sys.argv) - 1].split(" ")], stdout=subprocess.PIPE)
      output, error = process.communicate()
      print(output, error)
      break

    time.sleep(sleeptime)