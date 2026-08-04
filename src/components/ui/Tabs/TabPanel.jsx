import * as RadixTabs from "@radix-ui/react-tabs";

/**
 * @param {object} props
 * @param {string} props.value  Must match a Tabs tab value
 */
const TabPanel = ({ value, children, ...rest }) => (
  <RadixTabs.Content value={value} className="pt-4 outline-none" {...rest}>
    {children}
  </RadixTabs.Content>
);

export default TabPanel;
