import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload-minimal';
import { createWriteStream } from 'fs';
import { extname, join } from 'path';
import { v4 } from 'uuid';

@Resolver()
export class UploadResolver {
    @Query(() => String)
    hello(): string {
        return 'Hello world';
    }

    @Mutation(() => Boolean)
    async uploadFile(
        @Args({ name: 'file', type: () => GraphQLUpload })
        { createReadStream, filename }: FileUpload,
    ): Promise<boolean> {
        const filepath = join(
            process.cwd(),
            `uploads/${filename}-${v4()}.${extname(filename)}`,
        );
        return new Promise(async (resolve, reject) =>
            createReadStream()
                .pipe(createWriteStream(filepath))
                .on('finish', () => resolve(true))
                .on('error', () => reject(false)),
        );
    }
}
