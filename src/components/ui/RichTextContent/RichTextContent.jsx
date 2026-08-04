import cn from "../../../utils/cn";

/**
 * @param {object} props
 * @param {string} props.html  Only pass HTML from RichTextEditor or sanitized server-side
 */
const RichTextContent = ({ html, className = "", ...rest }) => (
  <div
    className={cn("mk-richtext text-sm text-ink", className)}
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML={{ __html: html }}
    {...rest}
  />
);

export default RichTextContent;
