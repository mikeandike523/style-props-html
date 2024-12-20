import pandas as pd
from tqdm import tqdm


def run_on_lines_with_streaming_and_tqdm(file_path, line_handler):
    """
    Processes each line of a file using a given line handler function,
    with a progress bar showing the number of lines processed.

    Args:
        file_path (str): The path to the file to be processed.
        line_handler (function): A function that processes a single line.
                                 It should accept a string as input.

    Returns:
        None
    """
    try:
        # Estimate the total number of lines for tqdm
        with open(file_path, "r", encoding="utf-8") as file:
            total_lines = sum(1 for _ in file)

        # Process the file with tqdm
        with open(file_path, "r", encoding="utf-8") as file:
            for line in tqdm(
                file, total=total_lines, unit="lines", desc="Processing Lines"
            ):
                line_handler(line.strip())  # Apply the handler function to each line

    except FileNotFoundError:
        print(f"Error: File not found at {file_path}")
    except Exception as e:
        print(f"Error: {e}")


def count_lines_with_streaming(file_path):
    """
    Counts the number of lines in a file efficiently using a file handle.

    Args:
        file_path (str): The path to the file to be counted.

    Returns:
        int: The number of lines in the file.
    """
    line_count = 0
    try:
        with open(file_path, "r", encoding="utf-8") as file:
            for _ in file:
                line_count += 1
    except FileNotFoundError:
        print(f"Error: File not found at {file_path}")
        return -1
    except Exception as e:
        print(f"Error: {e}")
        return -1

    return line_count


def read_justified_table_into_dataframe(filepath):
    rows = []

    print(f"Streaming file: {filepath}...")

    num_lines = count_lines_with_streaming(filepath)

    print(f"Found {num_lines} lines.")

    rows = []

    header_row = None

    def handler(line):
        nonlocal header_row
        nonlocal rows
        line = line.strip()
        if not line:
            return
        if header_row is None:
            header_row = []
            is_inside = False
            for i, char in enumerate(line):
                lookahead = line[i + 1] if i < len(line) - 1 else None
                if is_inside:
                    if char == " ":
                        if lookahead is None:
                            is_inside = False
                            header_row[-1] += char
                        else:
                            if lookahead == " ":
                                is_inside = False
                                header_row[-1] += char
                            else:
                                header_row[-1] += char
                    else:
                        header_row[-1] += char
                else:
                    if char == " ":
                        header_row[-1] += char
                    else:
                        is_inside = True
                        header_row.append(char)
        else:
            if len(header_row) == 0:
                raise ValueError("Header row is empty")
            chops = [len(column_name) for column_name in header_row]
            chops_acc = [0]
            for chop in chops[:-1]:
                chops_acc.append(chops_acc[-1] + chop)
            row = []
            for i, (start_point, length) in enumerate(zip(chops_acc, chops)):
                end_point = start_point + length if i < len(chops) - 1 else len(line)
                row.append(line[start_point:end_point].strip())
            rows.append(row)

    run_on_lines_with_streaming_and_tqdm(filepath, handler)

    header_row = [column_name.strip() for column_name in header_row]

    df = pd.DataFrame(rows, columns=header_row)

    return df
