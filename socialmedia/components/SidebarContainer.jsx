import useWindowDimensions from "@/hooks/useWidowsDimensions"
import { Drawer } from "antd";

const SidebarContainer = ({isDrawerOpen,setIsDrawerOpen ,children, ...other }) => {
    const {width} = useWindowDimensions();
    if(width <= 1268){
  return (
    <Drawer>
    <div>{children}</div>
    </Drawer>
  );
 }
};

export default SidebarContainer