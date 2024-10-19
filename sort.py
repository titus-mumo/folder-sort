from datetime import datetime
start_time = datetime.now()
import os
import shutil

root_path = "C:\\Users\\saki\\Desktop"
root = os.path.realpath(root_path)

target_path = "C:\\Users\\saki\\Desktop\\Coding Projects"
if not os.path.exists(target_path):
    os.makedirs(target_path)

target_directory = os.path.realpath(target_path)

projects = ['Python Projects', 'JavaScript Projects', 'TypeScript Projects', 'Other']
files_in_target = os.listdir(target_directory)

for project in projects:
    if project not in files_in_target:
        project_path = target_directory + '\\' + project
        project_directory = os.path.realpath(project_path)
        os.makedirs(project_directory)

python_directory = ''
typescript_directory = ''
javascript_directory = ''
other_directory = ''

files_in_target = os.listdir(target_directory)
for directory in files_in_target:
    if directory.startswith('Python'):
        python_path = target_directory + '\\' + directory
        python_directory = os.path.realpath(python_path)
    elif directory.startswith('TypeScript'):
        typescript_path = target_directory + '\\' + directory
        typescript_directory = os.path.realpath(typescript_path)
    elif directory.startswith("JavaScript"):
        javascript_path = target_directory + '\\' + directory
        javascript_directory = os.path.realpath(javascript_path)
    else:
        other_path = target_directory + '\\' + directory
        other_directory = os.path.realpath(other_path)


        
for filename in os.listdir(root):
    f = os.path.join(root, filename)
    if os.path.isdir(f) and not f.endswith('Coding Projects'):
        files_in_directory = os.listdir(f)
        if [f for f in files_in_directory if (f.endswith('.py') or f.endswith('requirements.txt'))]:
            shutil.move(f, python_directory)
        elif [f for f in files_in_directory if f.endswith('.ts')]:
            shutil.move(f, typescript_directory)
        elif [f for f in files_in_directory if f.endswith('.js')]:
            shutil.move(f, javascript_directory)
        else:
            shutil.move(f, other_directory)

end_time = datetime.now()
total_time = end_time - start_time
print(total_time)


        



