
import React from 'react';
import StylePropsComponent, {StylePropsComponentProps} from "./StylePropsComponent";


export type AProps = StylePropsComponentProps<HTMLAnchorElement>
 & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const A = React.forwardRef<HTMLAnchorElement,
AProps>(function A(props, ref){


    return <StylePropsComponent tag="a" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type AbbrProps = StylePropsComponentProps<HTMLElement>
;

export const Abbr = React.forwardRef<HTMLElement,
AbbrProps>(function Abbr(props, ref){


    return <StylePropsComponent tag="abbr" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type AddressProps = StylePropsComponentProps<HTMLElement>
;

export const Address = React.forwardRef<HTMLElement,
AddressProps>(function Address(props, ref){


    return <StylePropsComponent tag="address" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type AreaProps = StylePropsComponentProps<HTMLAreaElement>
 & React.AreaHTMLAttributes<HTMLAreaElement>;

export const Area = React.forwardRef<HTMLAreaElement,
AreaProps>(function Area(props, ref){


    return <StylePropsComponent tag="area" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type ArticleProps = StylePropsComponentProps<HTMLElement>
;

export const Article = React.forwardRef<HTMLElement,
ArticleProps>(function Article(props, ref){


    return <StylePropsComponent tag="article" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type AsideProps = StylePropsComponentProps<HTMLElement>
;

export const Aside = React.forwardRef<HTMLElement,
AsideProps>(function Aside(props, ref){


    return <StylePropsComponent tag="aside" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type AudioProps = StylePropsComponentProps<HTMLAudioElement>
 & React.AudioHTMLAttributes<HTMLAudioElement>;

export const Audio = React.forwardRef<HTMLAudioElement,
AudioProps>(function Audio(props, ref){


    return <StylePropsComponent tag="audio" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type BProps = StylePropsComponentProps<HTMLElement>
;

export const B = React.forwardRef<HTMLElement,
BProps>(function B(props, ref){


    return <StylePropsComponent tag="b" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type BaseProps = StylePropsComponentProps<HTMLBaseElement>
 & React.BaseHTMLAttributes<HTMLBaseElement>;

export const Base = React.forwardRef<HTMLBaseElement,
BaseProps>(function Base(props, ref){


    return <StylePropsComponent tag="base" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type BdiProps = StylePropsComponentProps<HTMLElement>
;

export const Bdi = React.forwardRef<HTMLElement,
BdiProps>(function Bdi(props, ref){


    return <StylePropsComponent tag="bdi" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type BdoProps = StylePropsComponentProps<HTMLElement>
;

export const Bdo = React.forwardRef<HTMLElement,
BdoProps>(function Bdo(props, ref){


    return <StylePropsComponent tag="bdo" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type BlockquoteProps = StylePropsComponentProps<HTMLQuoteElement>
 & React.BlockquoteHTMLAttributes<HTMLQuoteElement>;

export const Blockquote = React.forwardRef<HTMLQuoteElement,
BlockquoteProps>(function Blockquote(props, ref){


    return <StylePropsComponent tag="blockquote" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type BodyProps = StylePropsComponentProps<HTMLBodyElement>
;

export const Body = React.forwardRef<HTMLBodyElement,
BodyProps>(function Body(props, ref){


    return <StylePropsComponent tag="body" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type BrProps = StylePropsComponentProps<HTMLBRElement>
;

export const Br = React.forwardRef<HTMLBRElement,
BrProps>(function Br(props, ref){


    return <StylePropsComponent tag="br" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type ButtonProps = StylePropsComponentProps<HTMLButtonElement>
 & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = React.forwardRef<HTMLButtonElement,
ButtonProps>(function Button(props, ref){


    return <StylePropsComponent tag="button" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type CanvasProps = StylePropsComponentProps<HTMLCanvasElement>
 & React.CanvasHTMLAttributes<HTMLCanvasElement>;

export const Canvas = React.forwardRef<HTMLCanvasElement,
CanvasProps>(function Canvas(props, ref){


    return <StylePropsComponent tag="canvas" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type CaptionProps = StylePropsComponentProps<HTMLTableCaptionElement>
;

export const Caption = React.forwardRef<HTMLTableCaptionElement,
CaptionProps>(function Caption(props, ref){


    return <StylePropsComponent tag="caption" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type CiteProps = StylePropsComponentProps<HTMLElement>
;

export const Cite = React.forwardRef<HTMLElement,
CiteProps>(function Cite(props, ref){


    return <StylePropsComponent tag="cite" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type CodeProps = StylePropsComponentProps<HTMLElement>
;

export const Code = React.forwardRef<HTMLElement,
CodeProps>(function Code(props, ref){


    return <StylePropsComponent tag="code" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type ColProps = StylePropsComponentProps<HTMLTableColElement>
 & React.ColHTMLAttributes<HTMLTableColElement>;

export const Col = React.forwardRef<HTMLTableColElement,
ColProps>(function Col(props, ref){


    return <StylePropsComponent tag="col" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type ColgroupProps = StylePropsComponentProps<HTMLTableColElement>
 & React.ColgroupHTMLAttributes<HTMLTableColElement>;

export const Colgroup = React.forwardRef<HTMLTableColElement,
ColgroupProps>(function Colgroup(props, ref){


    return <StylePropsComponent tag="colgroup" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type DataProps = StylePropsComponentProps<HTMLDataElement>
 & React.DataHTMLAttributes<HTMLDataElement>;

export const Data = React.forwardRef<HTMLDataElement,
DataProps>(function Data(props, ref){


    return <StylePropsComponent tag="data" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type DatalistProps = StylePropsComponentProps<HTMLDataListElement>
;

export const Datalist = React.forwardRef<HTMLDataListElement,
DatalistProps>(function Datalist(props, ref){


    return <StylePropsComponent tag="datalist" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type DdProps = StylePropsComponentProps<HTMLElement>
;

export const Dd = React.forwardRef<HTMLElement,
DdProps>(function Dd(props, ref){


    return <StylePropsComponent tag="dd" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type DelProps = StylePropsComponentProps<HTMLModElement>
 & React.DelHTMLAttributes<HTMLModElement>;

export const Del = React.forwardRef<HTMLModElement,
DelProps>(function Del(props, ref){


    return <StylePropsComponent tag="del" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type DetailsProps = StylePropsComponentProps<HTMLDetailsElement>
 & React.DetailsHTMLAttributes<HTMLDetailsElement>;

export const Details = React.forwardRef<HTMLDetailsElement,
DetailsProps>(function Details(props, ref){


    return <StylePropsComponent tag="details" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type DfnProps = StylePropsComponentProps<HTMLElement>
;

export const Dfn = React.forwardRef<HTMLElement,
DfnProps>(function Dfn(props, ref){


    return <StylePropsComponent tag="dfn" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type DialogProps = StylePropsComponentProps<HTMLDialogElement>
 & React.DialogHTMLAttributes<HTMLDialogElement>;

export const Dialog = React.forwardRef<HTMLDialogElement,
DialogProps>(function Dialog(props, ref){


    return <StylePropsComponent tag="dialog" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type DivProps = StylePropsComponentProps<HTMLDivElement>
;

export const Div = React.forwardRef<HTMLDivElement,
DivProps>(function Div(props, ref){


    return <StylePropsComponent tag="div" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type DlProps = StylePropsComponentProps<HTMLDListElement>
;

export const Dl = React.forwardRef<HTMLDListElement,
DlProps>(function Dl(props, ref){


    return <StylePropsComponent tag="dl" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type DtProps = StylePropsComponentProps<HTMLElement>
;

export const Dt = React.forwardRef<HTMLElement,
DtProps>(function Dt(props, ref){


    return <StylePropsComponent tag="dt" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type EmProps = StylePropsComponentProps<HTMLElement>
;

export const Em = React.forwardRef<HTMLElement,
EmProps>(function Em(props, ref){


    return <StylePropsComponent tag="em" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type EmbedProps = StylePropsComponentProps<HTMLEmbedElement>
 & React.EmbedHTMLAttributes<HTMLEmbedElement>;

export const Embed = React.forwardRef<HTMLEmbedElement,
EmbedProps>(function Embed(props, ref){


    return <StylePropsComponent tag="embed" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type FieldsetProps = StylePropsComponentProps<HTMLFieldSetElement>
 & React.FieldsetHTMLAttributes<HTMLFieldSetElement>;

export const Fieldset = React.forwardRef<HTMLFieldSetElement,
FieldsetProps>(function Fieldset(props, ref){


    return <StylePropsComponent tag="fieldset" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type FigcaptionProps = StylePropsComponentProps<HTMLElement>
;

export const Figcaption = React.forwardRef<HTMLElement,
FigcaptionProps>(function Figcaption(props, ref){


    return <StylePropsComponent tag="figcaption" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type FigureProps = StylePropsComponentProps<HTMLElement>
;

export const Figure = React.forwardRef<HTMLElement,
FigureProps>(function Figure(props, ref){


    return <StylePropsComponent tag="figure" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type FooterProps = StylePropsComponentProps<HTMLElement>
;

export const Footer = React.forwardRef<HTMLElement,
FooterProps>(function Footer(props, ref){


    return <StylePropsComponent tag="footer" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type FormProps = StylePropsComponentProps<HTMLFormElement>
 & React.FormHTMLAttributes<HTMLFormElement>;

export const Form = React.forwardRef<HTMLFormElement,
FormProps>(function Form(props, ref){


    return <StylePropsComponent tag="form" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type H1Props = StylePropsComponentProps<HTMLHeadingElement>
;

export const H1 = React.forwardRef<HTMLHeadingElement,
H1Props>(function H1(props, ref){


    return <StylePropsComponent tag="h1" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type H2Props = StylePropsComponentProps<HTMLHeadingElement>
;

export const H2 = React.forwardRef<HTMLHeadingElement,
H2Props>(function H2(props, ref){


    return <StylePropsComponent tag="h2" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type H3Props = StylePropsComponentProps<HTMLHeadingElement>
;

export const H3 = React.forwardRef<HTMLHeadingElement,
H3Props>(function H3(props, ref){


    return <StylePropsComponent tag="h3" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type H4Props = StylePropsComponentProps<HTMLHeadingElement>
;

export const H4 = React.forwardRef<HTMLHeadingElement,
H4Props>(function H4(props, ref){


    return <StylePropsComponent tag="h4" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type H5Props = StylePropsComponentProps<HTMLHeadingElement>
;

export const H5 = React.forwardRef<HTMLHeadingElement,
H5Props>(function H5(props, ref){


    return <StylePropsComponent tag="h5" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type H6Props = StylePropsComponentProps<HTMLHeadingElement>
;

export const H6 = React.forwardRef<HTMLHeadingElement,
H6Props>(function H6(props, ref){


    return <StylePropsComponent tag="h6" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type HeadProps = StylePropsComponentProps<HTMLHeadElement>
;

export const Head = React.forwardRef<HTMLHeadElement,
HeadProps>(function Head(props, ref){


    return <StylePropsComponent tag="head" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type HeaderProps = StylePropsComponentProps<HTMLElement>
;

export const Header = React.forwardRef<HTMLElement,
HeaderProps>(function Header(props, ref){


    return <StylePropsComponent tag="header" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type HrProps = StylePropsComponentProps<HTMLHRElement>
;

export const Hr = React.forwardRef<HTMLHRElement,
HrProps>(function Hr(props, ref){


    return <StylePropsComponent tag="hr" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type HtmlProps = StylePropsComponentProps<HTMLHtmlElement>
;

export const Html = React.forwardRef<HTMLHtmlElement,
HtmlProps>(function Html(props, ref){


    return <StylePropsComponent tag="html" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type IProps = StylePropsComponentProps<HTMLElement>
;

export const I = React.forwardRef<HTMLElement,
IProps>(function I(props, ref){


    return <StylePropsComponent tag="i" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type IframeProps = StylePropsComponentProps<HTMLIFrameElement>
 & React.IframeHTMLAttributes<HTMLIFrameElement>;

export const Iframe = React.forwardRef<HTMLIFrameElement,
IframeProps>(function Iframe(props, ref){


    return <StylePropsComponent tag="iframe" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type ImgProps = StylePropsComponentProps<HTMLImageElement>
 & React.ImgHTMLAttributes<HTMLImageElement>;

export const Img = React.forwardRef<HTMLImageElement,
ImgProps>(function Img(props, ref){


    return <StylePropsComponent tag="img" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type InputProps = StylePropsComponentProps<HTMLInputElement>
 & React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement,
InputProps>(function Input(props, ref){


    return <StylePropsComponent tag="input" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type InsProps = StylePropsComponentProps<HTMLModElement>
 & React.InsHTMLAttributes<HTMLModElement>;

export const Ins = React.forwardRef<HTMLModElement,
InsProps>(function Ins(props, ref){


    return <StylePropsComponent tag="ins" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type KbdProps = StylePropsComponentProps<HTMLElement>
;

export const Kbd = React.forwardRef<HTMLElement,
KbdProps>(function Kbd(props, ref){


    return <StylePropsComponent tag="kbd" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type LabelProps = StylePropsComponentProps<HTMLLabelElement>
 & React.LabelHTMLAttributes<HTMLLabelElement>;

export const Label = React.forwardRef<HTMLLabelElement,
LabelProps>(function Label(props, ref){


    return <StylePropsComponent tag="label" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type LegendProps = StylePropsComponentProps<HTMLLegendElement>
;

export const Legend = React.forwardRef<HTMLLegendElement,
LegendProps>(function Legend(props, ref){


    return <StylePropsComponent tag="legend" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type LiProps = StylePropsComponentProps<HTMLLIElement>
;

export const Li = React.forwardRef<HTMLLIElement,
LiProps>(function Li(props, ref){


    return <StylePropsComponent tag="li" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type LinkProps = StylePropsComponentProps<HTMLLinkElement>
 & React.LinkHTMLAttributes<HTMLLinkElement>;

export const Link = React.forwardRef<HTMLLinkElement,
LinkProps>(function Link(props, ref){


    return <StylePropsComponent tag="link" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type MainProps = StylePropsComponentProps<HTMLElement>
;

export const Main = React.forwardRef<HTMLElement,
MainProps>(function Main(props, ref){


    return <StylePropsComponent tag="main" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type MapProps = StylePropsComponentProps<HTMLMapElement>
 & React.MapHTMLAttributes<HTMLMapElement>;

export const Map = React.forwardRef<HTMLMapElement,
MapProps>(function Map(props, ref){


    return <StylePropsComponent tag="map" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type MarkProps = StylePropsComponentProps<HTMLElement>
;

export const Mark = React.forwardRef<HTMLElement,
MarkProps>(function Mark(props, ref){


    return <StylePropsComponent tag="mark" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type MenuProps = StylePropsComponentProps<HTMLMenuElement>
 & React.MenuHTMLAttributes<HTMLMenuElement>;

export const Menu = React.forwardRef<HTMLMenuElement,
MenuProps>(function Menu(props, ref){


    return <StylePropsComponent tag="menu" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type MetaProps = StylePropsComponentProps<HTMLMetaElement>
 & React.MetaHTMLAttributes<HTMLMetaElement>;

export const Meta = React.forwardRef<HTMLMetaElement,
MetaProps>(function Meta(props, ref){


    return <StylePropsComponent tag="meta" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type MeterProps = StylePropsComponentProps<HTMLMeterElement>
 & React.MeterHTMLAttributes<HTMLMeterElement>;

export const Meter = React.forwardRef<HTMLMeterElement,
MeterProps>(function Meter(props, ref){


    return <StylePropsComponent tag="meter" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type NavProps = StylePropsComponentProps<HTMLElement>
;

export const Nav = React.forwardRef<HTMLElement,
NavProps>(function Nav(props, ref){


    return <StylePropsComponent tag="nav" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type NoscriptProps = StylePropsComponentProps<HTMLElement>
;

export const Noscript = React.forwardRef<HTMLElement,
NoscriptProps>(function Noscript(props, ref){


    return <StylePropsComponent tag="noscript" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type SPHObjectProps = StylePropsComponentProps<HTMLObjectElement>
 & React.ObjectHTMLAttributes<HTMLObjectElement>;

export const SPHObject = React.forwardRef<HTMLObjectElement,
SPHObjectProps>(function SPHObject(props, ref){


    return <StylePropsComponent tag="object" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type OlProps = StylePropsComponentProps<HTMLOListElement>
;

export const Ol = React.forwardRef<HTMLOListElement,
OlProps>(function Ol(props, ref){


    return <StylePropsComponent tag="ol" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type OptgroupProps = StylePropsComponentProps<HTMLOptGroupElement>
 & React.OptgroupHTMLAttributes<HTMLOptGroupElement>;

export const Optgroup = React.forwardRef<HTMLOptGroupElement,
OptgroupProps>(function Optgroup(props, ref){


    return <StylePropsComponent tag="optgroup" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type OptionProps = StylePropsComponentProps<HTMLOptionElement>
 & React.OptionHTMLAttributes<HTMLOptionElement>;

export const Option = React.forwardRef<HTMLOptionElement,
OptionProps>(function Option(props, ref){


    return <StylePropsComponent tag="option" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type OutputProps = StylePropsComponentProps<HTMLOutputElement>
 & React.OutputHTMLAttributes<HTMLOutputElement>;

export const Output = React.forwardRef<HTMLOutputElement,
OutputProps>(function Output(props, ref){


    return <StylePropsComponent tag="output" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type PProps = StylePropsComponentProps<HTMLParagraphElement>
;

export const P = React.forwardRef<HTMLParagraphElement,
PProps>(function P(props, ref){


    return <StylePropsComponent tag="p" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type ParamProps = StylePropsComponentProps<HTMLParamElement>
 & React.ParamHTMLAttributes<HTMLParamElement>;

export const Param = React.forwardRef<HTMLParamElement,
ParamProps>(function Param(props, ref){


    return <StylePropsComponent tag="param" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type PictureProps = StylePropsComponentProps<HTMLElement>
;

export const Picture = React.forwardRef<HTMLElement,
PictureProps>(function Picture(props, ref){


    return <StylePropsComponent tag="picture" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type PreProps = StylePropsComponentProps<HTMLPreElement>
;

export const Pre = React.forwardRef<HTMLPreElement,
PreProps>(function Pre(props, ref){


    return <StylePropsComponent tag="pre" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type ProgressProps = StylePropsComponentProps<HTMLProgressElement>
 & React.ProgressHTMLAttributes<HTMLProgressElement>;

export const Progress = React.forwardRef<HTMLProgressElement,
ProgressProps>(function Progress(props, ref){


    return <StylePropsComponent tag="progress" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type QProps = StylePropsComponentProps<HTMLQuoteElement>
 & React.QuoteHTMLAttributes<HTMLQuoteElement>;

export const Q = React.forwardRef<HTMLQuoteElement,
QProps>(function Q(props, ref){


    return <StylePropsComponent tag="q" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type RpProps = StylePropsComponentProps<HTMLElement>
;

export const Rp = React.forwardRef<HTMLElement,
RpProps>(function Rp(props, ref){


    return <StylePropsComponent tag="rp" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type RtProps = StylePropsComponentProps<HTMLElement>
;

export const Rt = React.forwardRef<HTMLElement,
RtProps>(function Rt(props, ref){


    return <StylePropsComponent tag="rt" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type RubyProps = StylePropsComponentProps<HTMLElement>
;

export const Ruby = React.forwardRef<HTMLElement,
RubyProps>(function Ruby(props, ref){


    return <StylePropsComponent tag="ruby" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type SProps = StylePropsComponentProps<HTMLElement>
;

export const S = React.forwardRef<HTMLElement,
SProps>(function S(props, ref){


    return <StylePropsComponent tag="s" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type SampProps = StylePropsComponentProps<HTMLElement>
;

export const Samp = React.forwardRef<HTMLElement,
SampProps>(function Samp(props, ref){


    return <StylePropsComponent tag="samp" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type ScriptProps = StylePropsComponentProps<HTMLScriptElement>
 & React.ScriptHTMLAttributes<HTMLScriptElement>;

export const Script = React.forwardRef<HTMLScriptElement,
ScriptProps>(function Script(props, ref){


    return <StylePropsComponent tag="script" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type SectionProps = StylePropsComponentProps<HTMLElement>
;

export const Section = React.forwardRef<HTMLElement,
SectionProps>(function Section(props, ref){


    return <StylePropsComponent tag="section" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type SelectProps = StylePropsComponentProps<HTMLSelectElement>
 & React.SelectHTMLAttributes<HTMLSelectElement>;

export const Select = React.forwardRef<HTMLSelectElement,
SelectProps>(function Select(props, ref){


    return <StylePropsComponent tag="select" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type SlotProps = StylePropsComponentProps<HTMLSlotElement>
;

export const Slot = React.forwardRef<HTMLSlotElement,
SlotProps>(function Slot(props, ref){


    return <StylePropsComponent tag="slot" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type SmallProps = StylePropsComponentProps<HTMLElement>
;

export const Small = React.forwardRef<HTMLElement,
SmallProps>(function Small(props, ref){


    return <StylePropsComponent tag="small" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type SourceProps = StylePropsComponentProps<HTMLSourceElement>
 & React.SourceHTMLAttributes<HTMLSourceElement>;

export const Source = React.forwardRef<HTMLSourceElement,
SourceProps>(function Source(props, ref){


    return <StylePropsComponent tag="source" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type SpanProps = StylePropsComponentProps<HTMLSpanElement>
;

export const Span = React.forwardRef<HTMLSpanElement,
SpanProps>(function Span(props, ref){


    return <StylePropsComponent tag="span" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type StrongProps = StylePropsComponentProps<HTMLElement>
;

export const Strong = React.forwardRef<HTMLElement,
StrongProps>(function Strong(props, ref){


    return <StylePropsComponent tag="strong" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type StyleProps = StylePropsComponentProps<HTMLStyleElement>
 & React.StyleHTMLAttributes<HTMLStyleElement>;

export const Style = React.forwardRef<HTMLStyleElement,
StyleProps>(function Style(props, ref){


    return <StylePropsComponent tag="style" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type SubProps = StylePropsComponentProps<HTMLElement>
;

export const Sub = React.forwardRef<HTMLElement,
SubProps>(function Sub(props, ref){


    return <StylePropsComponent tag="sub" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type SummaryProps = StylePropsComponentProps<HTMLElement>
;

export const Summary = React.forwardRef<HTMLElement,
SummaryProps>(function Summary(props, ref){


    return <StylePropsComponent tag="summary" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type SupProps = StylePropsComponentProps<HTMLElement>
;

export const Sup = React.forwardRef<HTMLElement,
SupProps>(function Sup(props, ref){


    return <StylePropsComponent tag="sup" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type TableProps = StylePropsComponentProps<HTMLTableElement>
;

export const Table = React.forwardRef<HTMLTableElement,
TableProps>(function Table(props, ref){


    return <StylePropsComponent tag="table" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type TbodyProps = StylePropsComponentProps<HTMLTableSectionElement>
;

export const Tbody = React.forwardRef<HTMLTableSectionElement,
TbodyProps>(function Tbody(props, ref){


    return <StylePropsComponent tag="tbody" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type TdProps = StylePropsComponentProps<HTMLTableCellElement>
;

export const Td = React.forwardRef<HTMLTableCellElement,
TdProps>(function Td(props, ref){


    return <StylePropsComponent tag="td" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type TemplateProps = StylePropsComponentProps<HTMLTemplateElement>
;

export const Template = React.forwardRef<HTMLTemplateElement,
TemplateProps>(function Template(props, ref){


    return <StylePropsComponent tag="template" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type TextareaProps = StylePropsComponentProps<HTMLTextAreaElement>
 & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement,
TextareaProps>(function Textarea(props, ref){


    return <StylePropsComponent tag="textarea" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type TfootProps = StylePropsComponentProps<HTMLTableSectionElement>
;

export const Tfoot = React.forwardRef<HTMLTableSectionElement,
TfootProps>(function Tfoot(props, ref){


    return <StylePropsComponent tag="tfoot" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type ThProps = StylePropsComponentProps<HTMLTableCellElement>
;

export const Th = React.forwardRef<HTMLTableCellElement,
ThProps>(function Th(props, ref){


    return <StylePropsComponent tag="th" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type TheadProps = StylePropsComponentProps<HTMLTableSectionElement>
;

export const Thead = React.forwardRef<HTMLTableSectionElement,
TheadProps>(function Thead(props, ref){


    return <StylePropsComponent tag="thead" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type TimeProps = StylePropsComponentProps<HTMLTimeElement>
;

export const Time = React.forwardRef<HTMLTimeElement,
TimeProps>(function Time(props, ref){


    return <StylePropsComponent tag="time" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type TitleProps = StylePropsComponentProps<HTMLTitleElement>
;

export const Title = React.forwardRef<HTMLTitleElement,
TitleProps>(function Title(props, ref){


    return <StylePropsComponent tag="title" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type TrProps = StylePropsComponentProps<HTMLTableRowElement>
;

export const Tr = React.forwardRef<HTMLTableRowElement,
TrProps>(function Tr(props, ref){


    return <StylePropsComponent tag="tr" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type TrackProps = StylePropsComponentProps<HTMLTrackElement>
 & React.TrackHTMLAttributes<HTMLTrackElement>;

export const Track = React.forwardRef<HTMLTrackElement,
TrackProps>(function Track(props, ref){


    return <StylePropsComponent tag="track" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type UProps = StylePropsComponentProps<HTMLElement>
;

export const U = React.forwardRef<HTMLElement,
UProps>(function U(props, ref){


    return <StylePropsComponent tag="u" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type UlProps = StylePropsComponentProps<HTMLUListElement>
;

export const Ul = React.forwardRef<HTMLUListElement,
UlProps>(function Ul(props, ref){


    return <StylePropsComponent tag="ul" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type VarProps = StylePropsComponentProps<HTMLElement>
;

export const Var = React.forwardRef<HTMLElement,
VarProps>(function Var(props, ref){


    return <StylePropsComponent tag="var" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type VideoProps = StylePropsComponentProps<HTMLVideoElement>
 & React.VideoHTMLAttributes<HTMLVideoElement>;

export const Video = React.forwardRef<HTMLVideoElement,
VideoProps>(function Video(props, ref){


    return <StylePropsComponent tag="video" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


export type WbrProps = StylePropsComponentProps<HTMLElement>
;

export const Wbr = React.forwardRef<HTMLElement,
WbrProps>(function Wbr(props, ref){


    return <StylePropsComponent tag="wbr" ref={
        ref as React.ForwardedRef<HTMLElement>
        } {...props}/>;

});


