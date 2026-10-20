import { useEffect, useId, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronUp, LogOut, Settings2, UserRound } from "lucide-react";
import "./AccountMenu.css";

function AccountMenu({ userEmail, onLogout, placement }) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  const triggerRef = useRef(null);
  const menuId = useId();
  const navigate = useNavigate();
  const initial = userEmail?.trim()?.[0]?.toLocaleUpperCase() || null;
  const displayName = userEmail?.trim() || "Your account";

  useEffect(() => {
    if (!isOpen) return undefined;

    function handlePointerDown(event) {
      if (!wrapperRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  function handleLogout() {
    setIsOpen(false);
    onLogout();
    navigate("/", { replace: true });
  }

  return (
    <div
      className={`account-menu account-menu--${placement}`}
      ref={wrapperRef}
    >
      <button
        ref={triggerRef}
        className="account-trigger"
        type="button"
        aria-label="Open account menu"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={menuId}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className="account-avatar" aria-hidden="true">
          {initial || <UserRound />}
        </span>
        {placement === "sidebar" && (
          <span className="account-trigger-info">
            <strong>{displayName}</strong>
            <span>{userEmail ? "Signed in" : "Account"}</span>
          </span>
        )}
        <ChevronUp className="account-trigger-chevron" aria-hidden="true" />
      </button>

      {isOpen && (
        <div
          className="account-popover"
          id={menuId}
          role="menu"
          aria-label="Account menu"
        >
          <div className="account-popover-header">
            <span className="account-avatar account-avatar--large" aria-hidden="true">
              {initial || <UserRound />}
            </span>
            <span className="account-popover-identity">
              <strong>{displayName}</strong>
              <span>{userEmail ? "Signed in" : "Account"}</span>
            </span>
          </div>
          <div className="account-popover-divider" />
          <button
            className="account-menu-item account-menu-item--soon"
            type="button"
            role="menuitem"
            disabled
          >
            <Settings2 aria-hidden="true" />
            <span>Account settings</span>
            <span className="account-soon-badge">Soon</span>
          </button>
          <div className="account-popover-divider" />
          <button
            className="account-menu-item account-menu-item--logout"
            type="button"
            role="menuitem"
            onClick={handleLogout}
          >
            <LogOut aria-hidden="true" />
            <span>Log out</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default AccountMenu;
