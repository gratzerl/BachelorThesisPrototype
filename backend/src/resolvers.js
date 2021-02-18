import { resolvers as TableResolvers }  from './table/resolvers';
import { resolvers as CourseResolvers } from './course/resolvers';
import { resolvers as OrderResolvers } from './order/resolvers';
import { resolvers as ModifierResolvers } from './modifier/resolvers';
import { resolvers as OrderColItemResolver } from './orderColItem/resolver';
import { resolvers as OrderColModifierResolver} from './orderColModifier/resolver';

//resolvers resolve the requested data fields in the requests

//resolver function arguments: obj, args, context, info
//obj:  result of the previous resolver call 
//args: query/mutation/subscription arugments
//context: context defined in apollo server
//info: general information, like the abstract syntax tree (AST)

const rootResolvers = [TableResolvers, CourseResolvers, OrderResolvers, ModifierResolvers, OrderColItemResolver, OrderColModifierResolver];

export default rootResolvers;


