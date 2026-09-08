import type { SchemaTypeDefinition } from "sanity";
import { pageType } from "./page";
import { productType } from "./product";

export const schemaTypes: SchemaTypeDefinition[] = [pageType, productType];
