import Adherent from '../models/adherentModel.js';
import { adherentValidator } from '../validators/adherentValidator.js';  


export const getAllAdherents = async (req, res) => {
  try {
    const adherents = await Adherent.find();
    res.json(adherents);
  } catch (error) {
    console.error("Erreur lors de la récupération des adhérents:", error);
    res.status(500).json({ message: 'Erreur interne du serveur', error: error.message });
  }
};


export const createAdherent = async (req, res) => {
  const { error } = adherentValidator.validate(req.body); 

  if (error) {
    return res.status(400).json({ message: 'Données invalides', details: error.details });
  }

  try {

    const existingEmail = await Adherent.findOne({ email: req.body.email });
    if (existingEmail) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé par un autre adhérent.' });
    }


    const existingTelephone = await Adherent.findOne({ telephone: req.body.telephone });
    if (existingTelephone) {
      return res.status(400).json({ message: 'Ce numéro de téléphone est déjà utilisé par un autre adhérent.' });
    }

    const newAdherent = new Adherent(req.body);
    const savedAdherent = await newAdherent.save();
    res.status(201).json(savedAdherent);
  } catch (error) {
    console.error("Erreur lors de la création de l'adhérent:", error);
    res.status(500).json({ message: "Erreur lors de la création de l'adhérent", error: error.message });
  }
};


export const updateAdherent = async (req, res) => {
  const { adherentId } = req.params;

  const { error } = adherentValidator.validate(req.body); 
  if (error) {
    return res.status(400).json({ message: 'Données invalides', details: error.details });
  }

  try {
    const adherent = await Adherent.findById(adherentId);
    if (!adherent) return res.status(404).json({ message: 'Adhérent non trouvé' });


    const existingEmail = await Adherent.findOne({ email: req.body.email, _id: { $ne: adherentId } });
    if (existingEmail) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé par un autre adhérent.' });
    }


    const existingTelephone = await Adherent.findOne({ telephone: req.body.telephone, _id: { $ne: adherentId } });
    if (existingTelephone) {
      return res.status(400).json({ message: 'Ce numéro de téléphone est déjà utilisé par un autre adhérent.' });
    }


    Object.assign(adherent, req.body);

    const updatedAdherent = await adherent.save();
    res.status(200).json(updatedAdherent);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'adhérent:", error);
    res.status(500).json({ message: "Erreur lors de la mise à jour de l'adhérent", error: error.message });
  }
};


export const deleteAdherent = async (req, res) => {
  const { adherentId } = req.params;

  try {
    const adherent = await Adherent.findByIdAndDelete(adherentId);
    if (!adherent) return res.status(404).json({ message: 'Adhérent non trouvé' });

    res.status(200).json({ message: 'Adhérent supprimé avec succès' });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'adhérent:", error);
    res.status(500).json({ message: "Erreur lors de la suppression de l'adhérent", error: error.message });
  }
};
