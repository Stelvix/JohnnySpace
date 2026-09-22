export type Plante = {
  id?: number
  nom?: string
  etat?: string
  niveauHydratation?: number
}

export type PlanteFormValues = Partial<Plante>
