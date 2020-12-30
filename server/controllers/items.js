import { fetchItems, fetchItemDetails } from "../services/items.js";

export const queryItems = async (req, res) => {
  try {
    const query = req.query.q;
    const response = await fetchItems(query);
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const queryItemDetails = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const response = await fetchItemDetails(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
