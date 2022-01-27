export interface User {
  id?: any;
  login?: any;
  nom?: any;
  prenom?: any;
  telephone?: any;
  email?: any;
  etat?: boolean;
  profile?: any;
  data_creation?: any;
  isselected?: boolean;
}

export const guest: User = {
  id: 123,
  login: "unknown",
  nom: "unknown",
  prenom: "unknown",
  telephone: "unknown",
  email: "unknown",
  profile: "unknown",
  etat: false,
  data_creation: "unknown",
}


