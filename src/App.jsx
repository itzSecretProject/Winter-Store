import { useRef } from "react";
import Background from "./three/Background.jsx";
import Topbar from "./components/Topbar.jsx";
import Hero from "./components/Hero.jsx";
import Collection from "./components/Collection.jsx";
import Marquee from "./components/Marquee.jsx";
import Manifesto from "./components/Manifesto.jsx";
import Colophon from "./components/Colophon.jsx";
import CartDrawer from "./components/CartDrawer.jsx";
import { useReveal } from "./hooks/useReveal.js";

export default function App() {
  const main = useRef(null);
  useReveal(main);

  return (
    <>
      <Background />
      <div className="grain" aria-hidden="true" />
      <Topbar />
      <main className="shell" ref={main}>
        <Hero />
        <Collection />
        <Marquee />
        <Manifesto />
        <Colophon />
      </main>
      <CartDrawer />
    </>
  );
}
