def file_get_contents(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        return f.read()


def file_put_contents(filepath, content):
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)
