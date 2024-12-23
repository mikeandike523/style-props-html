from enum import Enum
import re


class TemplateModeKind(Enum):
    PYTHON_STYLE = 1
    CUSTOM = 2


class TemplateMode:
    def __init__(self, kind: TemplateModeKind, custom_start="<<", custom_end=">>"):
        """
        Initialize a TemplateMode object.

        This constructor sets up the template mode with a specified kind
        and optional custom delimiters.

        Parameters:
        kind (TemplateModeKind): The kind of template mode (e.g., PYTHON_STYLE
        or CUSTOM).
        custom_start (str, optional): The starting delimiter for custom template fields.
        Defaults to "<<".
        custom_end (str, optional): The ending delimiter for custom template fields.
        Defaults to ">>".

        Returns:
        None
        """
        self.kind = kind
        self.custom_start = custom_start
        self.custom_end = custom_end


class Template:

    def __init__(
        self,
        mode: TemplateMode = TemplateMode(
            TemplateModeKind.CUSTOM, custom_start="<<", custom_end=">>"
        ),
    ):
        """
        Initialize a Template object.

        This constructor sets up the Template with a specified mode
        and initializes the template text.

        Parameters:
        mode (TemplateMode): The mode for template rendering.
        Defaults to a custom mode with "<<" and ">>" as delimiters.

        Returns:
        None
        """
        self.mode = mode
        self.template_text = None

    @classmethod
    def render_python_style_template(cls, template_text: str, *args, **kwargs) -> str:
        """
        Render a template using Python's string formatting style.

        This method uses Python's built-in string formatting to render the template.

        Parameters:
        cls (class): The class object (implicitly passed for class methods).
        template_text (str): The template string to be rendered.
        *args: Variable length argument list for positional arguments.
        **kwargs: Arbitrary keyword arguments for named placeholders.

        Returns:
        str: The rendered template with all placeholders
        replaced by their corresponding values.
        """
        return template_text.format(*args, **kwargs)

    @classmethod
    def render_custom_template(
        cls, mode: TemplateMode, template_text: str, **kwargs
    ) -> str:
        """
        Renders a template in custom mode.
        Note: custom only excepts a key-value mapping and not positional arguments.
        """

        field_regex = (
            "("
            + re.escape(mode.custom_start)
            + r"\s*[a-zA-Z0-9_-]+\s*"
            + re.escape(mode.custom_end)
            + ")"
        )

        extract_field_name_regex = (
            re.escape(mode.custom_start)
            + r"\s*([a-zA-Z0-9_-]+)\s*"
            + re.escape(mode.custom_end)
        )

        template_parts = re.split(field_regex, template_text)

        acc = ""

        all_field_names = set()

        for part in template_parts:
            if m := re.match(extract_field_name_regex, part):
                field_name = m.group(1)
                all_field_names.add(field_name)

        missing_fields = []

        for name in all_field_names:
            if name not in kwargs:
                missing_fields.append(name)

        if len(missing_fields) > 0:
            raise ValueError(f"Missing required fields: {', '.join(missing_fields)}")

        for part in template_parts:
            if m := re.match(extract_field_name_regex, part):
                field_name = m.group(1)
                acc += kwargs[field_name]
            else:
                acc += part

        return acc

    def from_string(self, template_text: str):
        """
        Set the template text from a string.

        This method sets the template text for the Template object
        using the provided string.

        Parameters:
        template_text (str): The string containing the template text to be set.

        Returns:
        Template: The Template object itself, allowing for method chaining.
        """
        self.template_text = template_text
        return self

    def from_file(self, file_path: str):
        """
        Set the template text from a file.

        This method reads the contents of a file and sets it as the template text
        for the Template object.

        Parameters:
        file_path (str): The path to the file containing the template text.

        Returns:
        Template: The Template object itself, allowing for method chaining.

        Raises:
        IOError: If the file cannot be read or does not exist.
        """
        with open(file_path, "r", encoding="utf-8") as f:
            self.template_text = f.read()
        return self

    def render(self, *args, **kwargs) -> str:
        """
        Render the template with the provided arguments.

        This method renders the template text using either Python-style formatting
        or custom formatting, depending on the template mode.

        Parameters:
        *args: Variable length argument list for positional arguments.
               Used only in Python-style formatting.
        **kwargs: Arbitrary keyword arguments.
                  Used in both Python-style and custom formatting.

        Returns:
        str: The rendered template with all placeholders
        replaced by their corresponding values.

        Raises:
        ValueError: If no template text has been set
        or if an unsupported template mode is specified.
        """
        if self.template_text is None:
            raise ValueError("No template text has been set.")
        if self.mode.kind == TemplateModeKind.PYTHON_STYLE:
            return Template.render_python_style_template(
                self.template_text, *args, **kwargs
            )
        elif self.mode.kind == TemplateModeKind.CUSTOM:
            return Template.render_custom_template(
                self.mode, self.template_text, **kwargs
            )
        else:
            raise ValueError("Unsupported template mode")
        
    def render_save(self, file_path: str, *args, **kwargs) -> None:
        """
        Render the template and save the result to a file.

        This method renders the template with the provided arguments and saves the
        result to a file.

        Parameters:
        file_path (str): The path to the file where the rendered template will be saved.
        *args: Variable length argument list for positional arguments.
               Used only in Python-style formatting.
        **kwargs: Arbitrary keyword arguments.
                  Used in both Python-style and custom formatting.

        Returns:
        None

        Raises:
        ValueError: If no template text has been set
        or if an unsupported template mode is specified.
        """
        if self.template_text is None:
            raise ValueError("No template text has been set.")
        if self.mode.kind == TemplateModeKind.PYTHON_STYLE:
            rendered_text = Template.render_python_style_template(
                self.template_text, *args, **kwargs
            )
        elif self.mode.kind == TemplateModeKind.CUSTOM:
            rendered_text = Template.render_custom_template(
                self.mode, self.template_text, **kwargs
            )
        else:
            raise ValueError("Unsupported template mode")

        with open(file_path, "w", encoding="utf-8") as f:
            f.write(rendered_text)

