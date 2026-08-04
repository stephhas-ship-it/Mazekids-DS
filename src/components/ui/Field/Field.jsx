import * as React from "react";

/**
 * @param {object} props
 * @param {string} props.label
 * @param {string} [props.error]  Announced with the control, not detached from it
 * @param {string} [props.help]
 * @param {boolean} [props.required]
 */
// Field owns the a11y wiring: it clones its single child control with id,
// aria-invalid and aria-describedby so the message is announced with the input.
const Field = ({ label, htmlFor, error, help, required, children, ...rest }) => {
  const autoId = React.useId();
  const controlId = htmlFor ?? `${autoId}-control`;
  const messageId = `${autoId}-message`;
  const hasMessage = Boolean(error || help);

  const control =
    React.isValidElement(children) && !Array.isArray(children)
      ? React.cloneElement(children, {
          id: children.props.id ?? controlId,
          "aria-invalid": error ? true : children.props["aria-invalid"],
          "aria-describedby":
            [children.props["aria-describedby"], hasMessage ? messageId : null]
              .filter(Boolean)
              .join(" ") || undefined,
        })
      : children;

  return (
    <div className="flex flex-col gap-1.5" {...rest}>
      <label htmlFor={controlId} className="text-sm font-medium text-ink">
        {label}
        {required && <span className="ml-0.5 text-danger">*</span>}
      </label>
      {control}
      {error ? (
        <p id={messageId} className="text-xs text-danger-fg" role="alert">
          {error}
        </p>
      ) : help ? (
        <p id={messageId} className="text-xs text-ink-muted">
          {help}
        </p>
      ) : null}
    </div>
  );
};

export default Field;
