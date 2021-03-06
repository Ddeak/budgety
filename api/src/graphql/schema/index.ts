import { gql } from "apollo-server-micro";

import itemSchema from "./item";
import customSchema from "./custom";

const linkSchema = gql`
    type Query {
        _: Boolean
    }

    type Mutation {
        _: Boolean
    }

    type Subscription {
        _: Boolean
    }
`;

export default [linkSchema, itemSchema, customSchema];
