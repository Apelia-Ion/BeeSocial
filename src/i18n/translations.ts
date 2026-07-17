import type { Locale as DateFnsLocale } from "date-fns";
import { enUS, ro as roDateFns } from "date-fns/locale";

export const locales = ["en", "ro"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
export const LOCALE_COOKIE = "locale";

const en = {
  nav: {
    home: "Home",
    notifications: "Notifications",
    profile: "Profile",
    signIn: "Sign In",
    logout: "Logout",
    menu: "Menu",
    toggleTheme: "Toggle theme",
    switchLanguage: "Switch language",
  },
  sidebar: {
    welcome: "Welcome to the Hive!",
    loginPrompt: "Login to access your profile and buzz with others.",
    login: "Login",
    signUp: "Sign Up",
    following: "Following",
    followers: "Followers",
    noLocation: "No location",
    noWebsite: "No website",
  },
  createPost: {
    placeholder: "What's buzzing?",
    photo: "Photo",
    post: "Post",
    posting: "Posting...",
    success: "Post created successfully",
    error: "Failed to create post",
  },
  post: {
    commentPlaceholder: "Write a comment...",
    comment: "Comment",
    commenting: "Posting...",
    signInToComment: "Sign in to comment",
    commentSuccess: "Comment posted successfully",
    commentError: "Failed to add comment",
    deleteSuccess: "Post deleted successfully",
    deleteError: "Failed to delete post",
    imageAlt: "Post content",
  },
  deleteDialog: {
    label: "Delete post",
    title: "Delete post?",
    description:
      "This action cannot be undone. This will permanently delete your post.",
    cancel: "Cancel",
    delete: "Delete",
    deleting: "Deleting...",
  },
  follow: {
    follow: "Follow",
    unfollow: "Unfollow",
    followed: "Followed user",
    unfollowed: "Unfollowed user",
    error: "Error updating follow status",
  },
  whoToFollow: {
    title: "Who to Follow",
    followers: "{count} followers",
  },
  notifications: {
    title: "Notifications",
    recent: "Recent",
    empty: "No notifications yet.",
    liked: "{name} liked your post",
    commented: "{name} commented on your post",
    followed: "{name} started following you",
    generic: "{name} sent you a notification",
    someone: "Someone",
    justNow: "just now",
    dayAgo: "{count} day ago",
    daysAgo: "{count} days ago",
    hourAgo: "{count} hour ago",
    hoursAgo: "{count} hours ago",
    minuteAgo: "{count} minute ago",
    minutesAgo: "{count} minutes ago",
  },
  profile: {
    editProfile: "Edit Profile",
    editTitle: "Edit Profile",
    name: "Name",
    bio: "Bio",
    location: "Location",
    website: "Website",
    cancel: "Cancel",
    save: "Save",
    saving: "Saving...",
    posts: "Posts",
    likes: "Likes",
    noPosts: "No posts yet.",
    noLikedPosts: "No liked posts yet.",
    updated: "Profile updated",
    updateError: "Failed to update profile",
    following: "Following",
    followers: "Followers",
    notFoundTitle: "User not found",
    notFoundDescription: "The profile you are looking for does not exist.",
    goHome: "Go Home",
  },
  tasks: {
    title: "Tasks",
    yourTasks: "Your tasks",
    empty: "No tasks yet.",
    done: "Done",
    pending: "Pending",
  },
  imageUpload: {
    remove: "Remove image",
    preview: "Upload preview",
  },
};

export type Dictionary = typeof en;

const ro: Dictionary = {
  nav: {
    home: "Acasă",
    notifications: "Notificări",
    profile: "Profil",
    signIn: "Autentificare",
    logout: "Deconectare",
    menu: "Meniu",
    toggleTheme: "Schimbă tema",
    switchLanguage: "Schimbă limba",
  },
  sidebar: {
    welcome: "Bine ai venit în stup!",
    loginPrompt:
      "Autentifică-te pentru a-ți accesa profilul și a zumzăi cu ceilalți.",
    login: "Autentificare",
    signUp: "Înregistrare",
    following: "Urmăriri",
    followers: "Urmăritori",
    noLocation: "Fără locație",
    noWebsite: "Fără site",
  },
  createPost: {
    placeholder: "Ce zumzăie azi?",
    photo: "Fotografie",
    post: "Postează",
    posting: "Se postează...",
    success: "Postare creată cu succes",
    error: "Postarea nu a putut fi creată",
  },
  post: {
    commentPlaceholder: "Scrie un comentariu...",
    comment: "Comentează",
    commenting: "Se postează...",
    signInToComment: "Autentifică-te pentru a comenta",
    commentSuccess: "Comentariu adăugat cu succes",
    commentError: "Comentariul nu a putut fi adăugat",
    deleteSuccess: "Postare ștearsă cu succes",
    deleteError: "Postarea nu a putut fi ștearsă",
    imageAlt: "Conținutul postării",
  },
  deleteDialog: {
    label: "Șterge postarea",
    title: "Ștergi postarea?",
    description:
      "Această acțiune nu poate fi anulată. Postarea ta va fi ștearsă definitiv.",
    cancel: "Anulează",
    delete: "Șterge",
    deleting: "Se șterge...",
  },
  follow: {
    follow: "Urmărește",
    unfollow: "Nu mai urmări",
    followed: "Acum urmărești utilizatorul",
    unfollowed: "Nu mai urmărești utilizatorul",
    error: "Eroare la actualizarea urmăririi",
  },
  whoToFollow: {
    title: "Pe cine să urmărești",
    followers: "{count} urmăritori",
  },
  notifications: {
    title: "Notificări",
    recent: "Recente",
    empty: "Nicio notificare încă.",
    liked: "{name} a apreciat postarea ta",
    commented: "{name} a comentat la postarea ta",
    followed: "{name} a început să te urmărească",
    generic: "{name} ți-a trimis o notificare",
    someone: "Cineva",
    justNow: "chiar acum",
    dayAgo: "acum {count} zi",
    daysAgo: "acum {count} zile",
    hourAgo: "acum {count} oră",
    hoursAgo: "acum {count} ore",
    minuteAgo: "acum {count} minut",
    minutesAgo: "acum {count} minute",
  },
  profile: {
    editProfile: "Editează profilul",
    editTitle: "Editează profilul",
    name: "Nume",
    bio: "Biografie",
    location: "Locație",
    website: "Site",
    cancel: "Anulează",
    save: "Salvează",
    saving: "Se salvează...",
    posts: "Postări",
    likes: "Aprecieri",
    noPosts: "Nicio postare încă.",
    noLikedPosts: "Nicio postare apreciată încă.",
    updated: "Profil actualizat",
    updateError: "Profilul nu a putut fi actualizat",
    following: "Urmăriri",
    followers: "Urmăritori",
    notFoundTitle: "Utilizator negăsit",
    notFoundDescription: "Profilul pe care îl cauți nu există.",
    goHome: "Înapoi acasă",
  },
  tasks: {
    title: "Sarcini",
    yourTasks: "Sarcinile tale",
    empty: "Nicio sarcină încă.",
    done: "Finalizat",
    pending: "În așteptare",
  },
  imageUpload: {
    remove: "Elimină imaginea",
    preview: "Previzualizare imagine",
  },
};

export const dictionaries: Record<Locale, Dictionary> = { en, ro };

export const dateLocales: Record<Locale, DateFnsLocale> = {
  en: enUS,
  ro: roDateFns,
};

export type TranslationValues = Record<string, string | number>;

export function isLocale(value: string | null | undefined): value is Locale {
  return locales.includes(value as Locale);
}

export function translate(
  locale: Locale,
  key: string,
  values?: TranslationValues
): string {
  const result = key
    .split(".")
    .reduce<unknown>(
      (node, part) =>
        node && typeof node === "object"
          ? (node as Record<string, unknown>)[part]
          : undefined,
      dictionaries[locale]
    );

  let text = typeof result === "string" ? result : key;
  if (values) {
    for (const [name, value] of Object.entries(values)) {
      text = text.replace(`{${name}}`, String(value));
    }
  }
  return text;
}
