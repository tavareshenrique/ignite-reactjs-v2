import { NavLink } from "react-router-dom";
import { Timer, Scroll } from "phosphor-react";

import logoIgnite from "../../assets/logo-ignite.svg";

import { HeaderContainer } from "./styles";

export default function Header() {
  return (
    <HeaderContainer>
      <img
        src={logoIgnite}
        alt="Logo do Ignite, onde vemos: dois triânguloss verdes, onde um é maior e o outro menor, o triângulos menor está um pouco dentro do triângulos maior."
      />

      <nav>
        <NavLink to="/" title="Timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="Histórico">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  );
}
