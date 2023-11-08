import PropTypes from 'prop-types';

export const Post = ({ data }) => {
 

  return (
    <div>
      <h2>{data.attributes.text}</h2>
      {/* {data.user && data.user.username} - {data.attributes.text} */}
    </div>
  );
}

Post.propTypes = {
  data: PropTypes.shape({
    attributes: PropTypes.shape({
      text: PropTypes.string.isRequired,
    }).isRequired,
    user: PropTypes.shape({
      username: PropTypes.string,
    }),
  }).isRequired,
};
