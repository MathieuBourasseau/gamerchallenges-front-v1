import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ChangePasswordModal from "./ChangePasswordModal";
import { AuthContext } from "../../Context/AuthContext";

/**
 * Helper function to render the component with a mocked AuthContext.
 * We now provide all missing properties required by AuthContextType.
 */
function renderWithAuth(
  ui: React.ReactElement,
  { token = "fake-token", onClose = vi.fn() } = {},
) {
  return {
    onClose,
    ...render(
      <AuthContext.Provider 
        value={{ 
          token, 
          userId: "fake-user-id", 
          login: vi.fn(), 
          logout: vi.fn(), 
          loadingAuth: false 
        }}
      >
        {ui}
      </AuthContext.Provider>,
    ),
  };
}

describe("ChangePasswordModal", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the modal correctly", () => {
    renderWithAuth(<ChangePasswordModal onClose={vi.fn()} />);

    expect(screen.getByText("Modifier mon mot de passe")).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Ancien mot de passe"),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Nouveau mot de passe"),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Confirmer le mot de passe"),
    ).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "Annuler" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Valider" })).toBeInTheDocument();
  });

  it("shows an error when passwords do not match", async () => {
    const user = userEvent.setup();

    renderWithAuth(<ChangePasswordModal onClose={vi.fn()} />);

    await user.type(
      screen.getByPlaceholderText("Ancien mot de passe"),
      "oldpass",
    );
    await user.type(
      screen.getByPlaceholderText("Nouveau mot de passe"),
      "newpass1",
    );
    await user.type(
      screen.getByPlaceholderText("Confirmer le mot de passe"),
      "newpass2",
    );

    await user.click(screen.getByRole("button", { name: "Valider" }));

    expect(
      screen.getByText("Les mots de passe ne correspondent pas."),
    ).toBeInTheDocument();
  });

  it("sends the request and closes the modal on success", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    renderWithAuth(<ChangePasswordModal onClose={onClose} />);

    await user.type(
      screen.getByPlaceholderText("Ancien mot de passe"),
      "oldpass",
    );
    await user.type(
      screen.getByPlaceholderText("Nouveau mot de passe"),
      "newpass",
    );
    await user.type(
      screen.getByPlaceholderText("Confirmer le mot de passe"),
      "newpass",
    );

    await user.click(screen.getByRole("button", { name: "Valider" }));

    await waitFor(() => {
      expect(screen.getByText("Mot de passe modifié !")).toBeInTheDocument();
    });

    await waitFor(
      () => {
        expect(onClose).toHaveBeenCalled();
      },
      { timeout: 3000 },
    );
  });
});