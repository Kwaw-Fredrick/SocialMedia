import useWindowDimensions from "@/hooks/useWidowsDimensions"
import { Drawer } from "antd";
import css from "@/styles/sideBar.module.css"

const SidebarContainer = ({isDrawerOpen,setIsDrawerOpen ,children, ...other }) => {
    const {width} = useWindowDimensions();
    if(width <= 1268){
  return (
    <Drawer 
    placement="left"
    open={isDrawerOpen}
    onClose={setIsDrawerOpen}
    height={"100%"}
    className={css.SidebarContainer}
    >
        <div className={css.drawerContainer}>
            {children}
        </div>
    </Drawer>
  );
 } else{
    return (        
            {children}
    )
 }
};

export default SidebarContainer