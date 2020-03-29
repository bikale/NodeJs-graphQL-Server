const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} = require('graphql');

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: {
    name: { type: GraphQLString },
    age: { type: GraphQLInt }
  }
});

const postType = new GraphQLObjectType({
  name: 'Post',
  fields: {
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve: (source, params) => {
        return authors[source.author];
      }
    }
  }
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      posts: {
        type: new GraphQLList(postType),
        resolve: () => posts
      },
      post: {
        type: postType,
        args: { id: { type: GraphQLInt } },
        resolve: (parent, { id }) => posts[id]
      }
    }
  })
});

const posts = [
  {
    title: 'First post',
    description: 'Content of the first post',
    author: 'Flavio'
  },
  {
    title: 'Second post',
    description: 'Content of the second post',
    author: 'Roger'
  }
];

const authors = {
  Flavio: {
    name: 'Flavio',
    age: 36
  },
  Roger: {
    name: 'Roger',
    age: 7
  }
};

module.exports = schema;
