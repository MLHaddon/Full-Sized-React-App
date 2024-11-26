import History from "../models/historyModel";

export const getHistory = async (req, res) => {
  try {
    const history = await History.findAll({
      attributes: ['id', 'userId', 'productId', 'quantity', 'totalPrice', 'date'],
      order: [['date', 'DESC']]
    });
    res.json(history);
  } catch (error) {
    console.error('Error in getHistory:', error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getHistoryByUser = async (req, res) => {
  try {
    const history = await History.findAll({
      where: { userId: req.params.userId },
      attributes: ['id', 'userId', 'productId', 'quantity', 'totalPrice', 'date'],
      order: [['date', 'DESC']]
    });
    res.json(history);
  } catch (error) {
    console.error('Error in getHistoryByUser:', error);
    res.status(500).json({ message: "Internal server error" });
  }
};