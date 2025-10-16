import type { PropsWithChildren } from "react";
import MainNavigation from "./MainNavigation";
import classes from "./Layout.module.css";

function Layout(props: PropsWithChildren) {
  return (
    <div>
      <MainNavigation />
      <main className={classes.main}>{props.children}</main>
    </div>
  );
}

export default Layout;
