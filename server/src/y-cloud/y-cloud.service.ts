import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import {
    ListObjectsV2Command,
    PutObjectCommand,
    S3Client
} from '@aws-sdk/client-s3';

@Injectable()
export class YCloudService {
    private readonly BUCKET: string;
    private readonly ACCESS: string;
    private readonly SECRET: string;

    private s3: S3Client;

    constructor(private readonly cfg: ConfigService) {
        this.BUCKET = this.cfg.get('CLOUD_BUCKET');
        this.ACCESS = this.cfg.get('CLOUD_ACCESS');
        this.SECRET = this.cfg.get('CLOUD_SECRET');

        this.s3 = new S3Client({
            region: 'us-east-1',
            endpoint: 'https://storage.yandexcloud.net',
            logger: console,
            credentials: {
                accessKeyId: this.ACCESS,
                secretAccessKey: this.SECRET
            }
        });
    }

    public uploadToCloud = async (rootPath: string) => {
        const { s3 } = this;
        const uploadDirectory = async (directoryPath: string) => {
            const filesAndFolders = fs.readdirSync(directoryPath);

            for (const item of filesAndFolders) {
                const fullPath = path.join(directoryPath, item);
                const stat = fs.statSync(fullPath);

                if (stat.isDirectory()) {
                    await uploadDirectory(fullPath);
                } else {
                    const relativePath = path.relative(rootPath, directoryPath);

                    await s3.send(
                        new PutObjectCommand({
                            Bucket: this.BUCKET,
                            Key: path.join(relativePath, item),
                            Body: fs.createReadStream(fullPath)
                        })
                    );
                }
            }
        };

        await uploadDirectory(rootPath);
    };

    public getItem = async (article: string) => {
        const { s3, BUCKET: Bucket } = this;
        const images = await s3.send(
            new ListObjectsV2Command({ Bucket, Prefix: article })
        );
        return this.generateUrlsWithMainFirst(images);
    };

    public getItems = async () => {
        const { s3, BUCKET: Bucket } = this;
        return s3.send(new ListObjectsV2Command({ Bucket }));
    };

    private generateUrlsWithMainFirst(data) {
        const { Contents } = data;

        if (!Contents) {
            return [];
        }

        return Contents.map(
            link => `https://${this.BUCKET}.storage.yandexcloud.net/${link.Key}`
        );
    }
}
