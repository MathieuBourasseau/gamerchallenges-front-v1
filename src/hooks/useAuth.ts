import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

type UserInfo = {
	id: number;
	username: string;
	email: string;
	avatar: string | null;
	role: "user" | "admin";
	favouriteGame?: string | null;
	twitch?: string | null;
	youtube?: string | null;
	discord?: string | null;
	isBanned?: boolean;
};

export function useAuth() {
	const { token, login, logout } = useContext(AuthContext);

	const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
	const [loadingUser, setLoadingUser] = useState(true);

	useEffect(() => {
		async function fetchUser() {
			try {
				const response = await fetch(`${API_URL}/me`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				if (!response.ok) {
					throw new Error("Failed to fetch user");
				}

				const data = await response.json();
				setUserInfo(data);
			} catch (error) {
				console.error("Auth error:", error);
				logout();
			} finally {
				setLoadingUser(false);
			}
		}

		if (token) {
			fetchUser();
		} else {
			setUserInfo(null);
			setLoadingUser(false);
		}
	}, [token]);

	return { token, login, logout, userInfo, loadingUser };
}
