import {
  ActionIcon,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { motion } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";
import { PictoLogoLargeComponent } from "../_icons/IconComponents";
import "./Landing.css";

function Landing() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });
  const { pathname } = useLocation();
  const variants = {
    initialVar: {
      opacity: 0,
      x: -15,
    },
    inVar: {
      opacity: 1,
      x: 0,
    },
    // outVar: {
    //   opacity: 0,
    //   x: 10,
    // },
  };

  const transition = {
    type: "tween",
    ease: "linear",
    duration: 0.2,
  };

  return (
    <>
      <div id="containerMain">
        <motion.div transition={transition} layout>
          <PictoLogoLargeComponent />
        </motion.div>
        <br />
        <br />
        <main id="mainJoin">
          <motion.div
            key={pathname}
            initial="initialVar"
            animate="inVar"
            variants={variants}
            transition={transition}
          >
            <Outlet />
          </motion.div>
        </main>
        <br />
        <motion.div transition={transition} layout>
          <p className="version disableSelect">
            version {import.meta.env.VITE_APP_VERSION}
          </p>
        </motion.div>
      </div>
      <ActionIcon
        onClick={() =>
          setColorScheme(computedColorScheme === "light" ? "dark" : "light")
        }
        variant="default"
        size="xl"
        aria-label="Toggle color scheme"
      ></ActionIcon>
    </>
  );
}
export default Landing;
