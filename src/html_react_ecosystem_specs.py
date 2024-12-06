"""
Loads HTML tags and their specifications from a CSV file into
a convenient data structure for use in TypeScript code generation.
"""

import os
from dataclasses import dataclass
import re
from typing import Optional, Union


@dataclass
class HTMLElementSpec:
    """
    A simple class containing information about each HTML tag/element
    and how it interacts with the React ecosystem.
    """

    tag: str
    """The HTML tag (lowercase)."""

    element_type: str
    """
    The corresponding DOM element type.
    For most elements, we can derive its name through careful case conversion
    and string interpolation, but for clarity, we can just specify it directly.
    """

    is_void_element: bool
    """
    Whether the HTML tag, according to the official HTML specification,
    does not support children or interior HTML
    (e.g., <input>, <img>, <br>, <hr>, etc).
    """

    special_attributes_type: Optional[str] = None
    """
    For certain HTML elements, we need to further narrow the type so that
    all HTML props are available
    (e.g., React.ButtonHTMLAttributes<HTMLButtonElement>).
    """


# It is organized to keep it in a csv file

script_dir = os.path.dirname(__file__)

table_file = os.path.join(script_dir, "html_react_ecosystem_specs.txt")


def normalize_boolean_like(value: Union[str, float, int, bool]) -> bool:
    """
    Assist with data parsing by detecting boolean-like values
    """

    if isinstance(value, str):
        if value.lower() not in (["false", "0", "no"] + ["true", "1", "yes"]):
            raise ValueError(f"Invalid boolean value (string): {value}")
        return value.lower() in ["true", "1", "yes"]
    if isinstance(value, (float, int)):
        if value not in [0, 1]:
            raise ValueError(f"Invalid boolean value (numeric): {value}")
        return value == 1
    if isinstance(value, bool):
        return value
    raise ValueError(f"Invalid datatype: {type(value).__name__}")


def load_html_tags_from_table_file() -> dict[str, HTMLElementSpec]:
    """
    Loads HTML tags and their specifications from a CSV file into a dictionary.
    The format in the file is as follows (which is also the header row):

    tag,element_type,is_void_element,special_attributes_type

    The return type is a dictionary
    as we can assume the list of html tags is unique
    """

    html_tags = {}

    line_number = 1

    with open(table_file, "r", encoding="utf-8") as f:
        # Skip the header row
        next(f)

        line_number += 1

        for line in f:
            if line.strip() == "":
                line_number += 1
                continue

            # For our purposes we can safely assume that
            # no content has interior whitespace
            fields = [field.strip() for field in re.split(r"\s+", line.strip())]

            # Ensure we have at least the required fields
            if len(fields) < 3:
                raise ValueError(
                    f"""
                    Invalid format on line {line_number}: {line.strip()}.
                    Check the reference file
                    """
                )

            tag, element_type, is_void_element = fields[:3]
            special_attributes_type = fields[3] if len(fields) > 3 else None

            # Convert is_void_element to boolean
            is_void_element = normalize_boolean_like(is_void_element)

            # Create HTMLElement instance and add to dictionary
            html_tags[tag] = HTMLElementSpec(
                tag=tag,
                element_type=element_type,
                is_void_element=is_void_element,
                special_attributes_type=special_attributes_type,
            )

            line_number += 1

    return html_tags


html_element_specs = load_html_tags_from_table_file()
