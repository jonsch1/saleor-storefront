import "./scss/index.scss";

import * as React from "react";
import ReactSVG from "react-svg";

import { Overlay, OverlayContextInterface, PasswordResetForm } from "../..";
import Offline from "../../Offline";
import OfflinePlaceholder from "../../OfflinePlaceholder";
import Online from "../../Online";

import closeImg from "../../../images/x.svg";

const Password: React.SFC<{ overlay: OverlayContextInterface }> = ({
  overlay
}) => (
  <Overlay context={overlay}>
    <div className="password-reset">
      <Online>
        <div className="overlay__header">
          <p>Reset your password</p>
          <ReactSVG
            path={closeImg}
            onClick={overlay.hide}
            className="overlay__header__close-icon"
          />
        </div>
        <div className="password-reset__content">
          <PasswordResetForm />
        </div>
      </Online>
      <Offline>
        <OfflinePlaceholder />
      </Offline>
    </div>
  </Overlay>
);

export default Password;
