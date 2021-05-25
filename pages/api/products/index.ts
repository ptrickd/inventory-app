// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  value: string
}

export default (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { value } = req.body
  console.log('on the server', req.body)
  console.log('on the server', value)

  res.status(200).json({ value: req.body.value })
}