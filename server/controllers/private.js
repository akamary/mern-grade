export const getPrivateData = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: "You recieved access to the private data",
  });
};
