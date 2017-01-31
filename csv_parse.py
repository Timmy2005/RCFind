import csv
file = 'RC Finder Data Set.csv'


def parser():
    contents = get_contents(file)
    num_of_lines = file_len(file)
    print('Parsing file ' + file + '...')
    contents = repr(contents)
    contents_list = contents.split('\\n')
    content = {}
    a = 1
    for x in range(0, num_of_lines):
        z = contents_list[int(x)].split(',')
        z.append("Yes")
        for v in range(0, 13):
            content[str(a)] = z[v]
            content[str(a)].replace(']', 'a')
            print(content[str(a)])
            a += 1

    print('Adding values to database...')


def get_contents(file_name):
    results = []
    with open(file_name, 'rt') as f:
        for line in f:
            results.append(line)
    return results


def file_len(file_name):
    with open(file_name) as f:
        global i
        for i, l in enumerate(f):
            pass
    return i + 1


parser()
