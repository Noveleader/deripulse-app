import clientPromise from "../../../lib/mongodb";

const api = async (deri) => {
  let mongoClient = await clientPromise;
  const database = mongoClient.db("deripulse");
  const collection = database.collection("wholeData");
  const resp = await collection
    .find({
      "arrProtocolData.slug": deri,
    })
    .project({
      _id: 0,
      "arrProtocolData.$": 1,
      PoolData: 1,
    })
    .toArray();

  console.log(api);
  return resp;
};
export default async function handler(req, res) {
  const deri = req.query.deri;
  console.log();

  res.status(200).json(await api(deri));
}
