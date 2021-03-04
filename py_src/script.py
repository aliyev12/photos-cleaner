import os
import sys


def rename_files(base_name, directory='./'):
    if directory[-1] != "/":
        directory = directory + "/"
    for count, file_path in enumerate(os.listdir(directory)):
        filename, file_extension = os.path.splitext(file_path)
        dst = base_name + "_" + str(count) + file_extension
        src = directory + file_path
        dst = directory + dst
        os.rename(src, dst)


if __name__ == "__main__":
    print(sys.argv)
    if (len(sys.argv) >= 2):
        action = sys.argv[1]

        commands = [["-h", "--h", "-help", "--help"], "--rename-files"]

        if action in commands[0]:
            print(f"Type one of the following commands:\n")
            for command in commands[1:]:
                if command == commands[1]:
                    print(
                        f"\t{command}: Rename all files in a directory by using the base name and index of a file.")
                    print("\t\tThis is the format: <base_name>_1.jpg")
                    print(
                        f"\t\tExample: $ python script.py {command} 'my_photo' '/Users/abdulaliyev/web-projects/'")
                    print(
                        "\t\tLast argument, base directory, is optional. If not provided then the current directory will be used.\n")

        elif action == commands[1]:
            # ['/Users/abdulaliyev/web-projects/electron/photos-cleaner/script.py', '--rename-files', 'green_bb_J']
            if len(sys.argv) >= 3:
                directory = "./"
                if len(sys.argv) == 4:
                    directory = sys.argv[3]
                base_name = sys.argv[2]
                rename_files(base_name, directory)
            else:
                print("Enter the base name for the files")
            # case 2: monthString = "February";
            #          break;
        else:
            print("Command was not recognized")

    else:
        print("Provide a command")
