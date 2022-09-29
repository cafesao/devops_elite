const modifyBody = {
  client: (body: any) => {
    return {
      ...body,
      name: body.name.toLowerCase()
    }
  },
  animal: (body: any) => {
    return {
      ...body,
      name: body.name.toLowerCase(),
      age: Number(body.age)
    }
  }
}

export default modifyBody
