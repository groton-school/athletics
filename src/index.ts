import { build } from '@qui-cli/structured';
import { kebabCase } from 'change-case';

build({ fileName: import.meta.filename, commandCase: kebabCase });
