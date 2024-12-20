import re
import pandas as pd
from tqdm import tqdm


def read_justified_table_into_dataframe(filepath):
    # First pass: count the total number of lines
    with open(filepath, "r", encoding="utf-8") as f:
        total_lines = sum(1 for _ in f)

    # Re-open and stream again from the start
    with open(filepath, "r", encoding="utf-8") as f:
        header_line = None
        line_count = 0

        # Find the first non-empty line as the header line
        for line in f:
            line_count += 1
            if line.strip():
                header_line = line.strip()
                break

        if header_line is None:
            # No header line found, return empty DataFrame
            return pd.DataFrame()

        # Use regex to split the header into column names
        header = re.split(r"\s{2,}", header_line)

        rows = []
        # Lines remaining to be processed
        remaining_lines = total_lines - line_count

        # Process remaining lines with a progress bar
        with tqdm(total=remaining_lines, unit="lines", desc="Processing Lines") as pbar:
            for line in f:
                pbar.update(1)
                stripped_line = line.strip()
                if not stripped_line:
                    continue
                row = re.split(r"\s{2,}", stripped_line)
                rows.append(row)

    df = pd.DataFrame(rows, columns=header)
    return df
