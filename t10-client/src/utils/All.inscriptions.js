function AllInscriptions(data) {
  const { id, createdAt } = data;
  const { firstName, lastName, email } = data.user;
  const { name } = data.onCourse.Course;
  return { id, firstName, lastName, email, createdAt, name };
}

export default AllInscriptions;
