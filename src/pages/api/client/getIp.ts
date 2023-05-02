import { type NextApiRequest, type NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  let ip;

  if (req.headers['x-forwarded-for']) {
    ip = (<string>req.headers['x-forwarded-for']).split(',')[0];
  } else if (req.headers['x-real-ip']) {
    ip = req.connection.remoteAddress;
  } else {
    ip = req.connection.remoteAddress;
  }

  res.status(200).json({ ipAddress: ip });
}
