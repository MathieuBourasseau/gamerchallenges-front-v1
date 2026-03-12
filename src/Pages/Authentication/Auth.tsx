import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FormAuth from "./FormAuth";
import Button from "../../ui/Button";

export default function Auth() {
  const location = useLocation();
  const navigate = useNavigate();

  // Active tab ("login" or "register")
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  // Sync the active tab with the URL (ex: /auth?mode=login)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const modeFromUrl = params.get("mode");

    if (modeFromUrl === "login" || modeFromUrl === "register") {
      setActiveTab(modeFromUrl);
    }
  }, [location.search]);

  return (
    <section className="flex flex-col items-center justify-center mx-auto min-h-screen w-full px-4 sm:px-6 md:px-8 gap-6 sm:gap-8 py-8 sm:py-12">
      {/* Tabs */}
      <div className="flex flex-row w-full gap-2 sm:gap-3 max-w-sm sm:max-w-md">
        <Button
          label="Connexion"
          type="button"
          active={activeTab === "login"}
          width="w-full"
          padding="py-2 sm:py-3 px-3 sm:px-6"
          onClick={() => {
            navigate("/auth?mode=login");
            setActiveTab("login");
          }}
        />

        <Button
          label="Inscription"
          type="button"
          active={activeTab === "register"}
          width="w-full"
          padding="py-2 sm:py-3 px-3 sm:px-6"
          onClick={() => {
            navigate("/auth?mode=register");
            setActiveTab("register");
          }}
        />
      </div>

      {/* Dynamic form */}
      <FormAuth mode={activeTab} />
    </section>
  );
}
