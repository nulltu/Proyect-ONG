function newInscription(data) {
  const { id, createdAt } = data;
  const { firstName, lastName, email } = data.user;
  return { id, firstName, lastName, email, createdAt };
}

export default newInscription;
