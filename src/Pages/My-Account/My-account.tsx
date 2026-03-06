import { useState, useEffect, ChangeEvent } from "react";

type User = {
  id: number;
  username: string;
  email: string;
  avatar?: string;
  favouriteGame?: string;
  twitch?: string;
  youtube?: string;
  discord?: string;
};

type UserForm = {
  username: string;
  email: string;
  favouriteGame: string;
  twitch: string;
  youtube: string;
  discord: string;
  avatar: File | null;
};

type MonCompteProps = {
  userId: number;
};

export default function MonCompte({ userId }: MonCompteProps) {
  const [user, setUser] = useState<User | null>(null);
  const [form, setForm] = useState<UserForm>({
    username: "",
    email: "",
    favouriteGame: "",
    twitch: "",
    youtube: "",
    discord: "",
    avatar: null,
  });

  
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`)
      .then(res => res.json())
      .then((data: User) => {
        setUser(data);
        setForm({
          username: data.username || "",
          email: data.email || "",
          favouriteGame: data.favouriteGame || "",
          twitch: data.twitch || "",
          youtube: data.youtube || "",
          discord: data.discord || "",
          avatar: null,
        });
      })
      .catch((error) => console.error("Erreur lors de la récupération :", error));
  }, [userId]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setForm(prev => ({ ...prev, avatar: file }));
    }
  };

  const handleSubmit = async (event: SubmitEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("username", form.username);
    formData.append("email", form.email);
    formData.append("favouriteGame", form.favouriteGame);
    formData.append("twitch", form.twitch);
    formData.append("youtube", form.youtube);
    formData.append("discord", form.discord);
    if (form.avatar) formData.append("avatar", form.avatar);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
        method: "PATCH",
        body: formData,
      });

      const updatedUser = await response.json();
      setUser(updatedUser.user);
      alert("Compte mis à jour !");
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      alert("Erreur lors de la mise à jour du compte");
    }
  };

  if (!user) return <p>Chargement...</p>;

  return (
    <div>
      <h1>Mon Compte</h1>
      {user.avatar && (
        <img
          src={`${import.meta.env.VITE_API_URL}/uploads/avatars/${user.avatar}`}
          alt="Avatar"
          width={150}
        />
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Avatar :</label>
          <input type="file" onChange={handleFileChange} />
        </div>
        <div>
          <label>Pseudo :</label>
          <input type="text" name="username" value={form.username} onChange={handleChange} />
        </div>
        <div>
          <label>Email :</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} />
        </div>
        <div>
          <label>Jeu préféré :</label>
          <input type="text" name="favouriteGame" value={form.favouriteGame} onChange={handleChange} />
        </div>
        <div>
          <label>Twitch :</label>
          <input type="text" name="twitch" value={form.twitch} onChange={handleChange} />
        </div>
        <div>
          <label>YouTube :</label>
          <input type="text" name="youtube" value={form.youtube} onChange={handleChange} />
        </div>
        <div>
          <label>Discord :</label>
          <input type="text" name="discord" value={form.discord} onChange={handleChange} />
        </div>
        <button type="submit">Mettre à jour</button>
      </form>
    </div>
  );
}
