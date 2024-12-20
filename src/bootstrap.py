"""
Generates files "htmlTagData.ts" and "style-props-html.tsx"

Refer to "htmlTagData.old.ts" and "style-props-html.old.tsx"
for the general structure of the generated files
"""

import os

from html_react_ecosystem_specs import html_element_specs
from pysrc.utils.justified_table import read_justified_table_into_dataframe

os.chdir(os.path.dirname(__file__))


css_property_map = read_justified_table_into_dataframe("css_property_map.txt")

print(css_property_map.head())


special_cases = read_justified_table_into_dataframe("special_cases.txt")


HTML_TAG_DATA_TS_TEMPLATE = """
export const nonVoidTags = [
{}
] as const;

export const voidTags = [
{}
] as const;

export const allTags = [...nonVoidTags,...voidTags] as const;
"""

non_void_tags_text = ""
void_tags_text = ""

for tag, spec in html_element_specs.items():
    if spec.is_void_element:
        void_tags_text += f'"{tag}",\n'
    else:
        non_void_tags_text += f'"{tag}",\n'

with open("htmlTagData.ts", "w", encoding="utf-8") as f:
    f.write(HTML_TAG_DATA_TS_TEMPLATE.format(non_void_tags_text, void_tags_text))


STYLE_PROPS_HTML_TSX_TEMPLATE = """
import React from 'react';
import StylePropsComponent, {{StylePropsComponentProps}} from "./StylePropsComponent";

{}
"""

STYLE_PROPS_HTML_COMPONENT_TEMPLATE = """
export type {props_name} = StylePropsComponentProps<{element_type}>
{opt_special_attributes_text};

export const {component_name} = React.forwardRef<{element_type} | null,
{props_name}>(function {component_name}(props, ref){{


    return <StylePropsComponent tag="{tag}" ref={{
        ref as
        undefined | React.ForwardedRef<HTMLElement | null>
        }} {{...props}}/>;

}});

"""

style_props_html_file_text = ""

for tag, spec in html_element_specs.items():
    component_name = f"{tag[0].upper()}{(tag[1:])}"
    props_name = f"{component_name}Props"
    element_type = spec.element_type
    opt_special_attributes_text = (
        f" & React.{spec.special_attributes_type}<{element_type}>"
        if spec.special_attributes_type
        else ""
    )
    style_props_html_file_text += STYLE_PROPS_HTML_COMPONENT_TEMPLATE.format(
        component_name=component_name,
        tag=tag,
        element_type=element_type,
        props_name=props_name,
        opt_special_attributes_text=opt_special_attributes_text,
    )


with open("index.tsx", "w", encoding="utf-8") as f:
    f.write(STYLE_PROPS_HTML_TSX_TEMPLATE.format(style_props_html_file_text))
