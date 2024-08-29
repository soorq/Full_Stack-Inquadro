import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import EasyYandexS3 from 'easy-yandex-s3';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class YCloudService {
    private readonly HOST_URL: string;
    private readonly BUCKET: string;
    private readonly ACCESS: string;
    private readonly SECRET: string;

    constructor(private readonly cfg: ConfigService) {
        this.HOST_URL = this.cfg.get('CLOUD_HOST_URL');
        this.BUCKET = this.cfg.get('CLOUD_BUCKET');
        this.ACCESS = this.cfg.get('CLOUD_ACCESS');
        this.SECRET = this.cfg.get('CLOUD_SECRET');
    }

    public uploadToCloud = async (rootPath: string) => {
        const upload = await this.getYandexS3();
        const uploadDirectory = async (directoryPath: string) => {
            const filesAndFolders = fs.readdirSync(directoryPath);

            for (const item of filesAndFolders) {
                const fullPath = path.join(directoryPath, item);
                const stat = fs.statSync(fullPath);

                if (stat.isDirectory()) {
                    await uploadDirectory(fullPath);
                } else {
                    const relativePath = path.relative(rootPath, directoryPath);
                    const filePath = path.join(relativePath, item);

                    console.log(`Uploading ${filePath} from ${fullPath}`);
                    await upload.Upload(
                        { path: fullPath, name: item },
                        `/${relativePath}/`
                    );
                }
            }
        };

        await uploadDirectory(rootPath);
    };

    public getItem = async (article: string) => {
        const getLists = await this.getYandexS3();
        const images = await getLists.GetList(`/${article}`);
        return this.generateUrlsWithMainFirst(images);
    };

    public getItems = async () => {
        const getLists = await this.getYandexS3();
        const images = await getLists.GetList('');
        return images;
    };

    private async getYandexS3() {
        return new EasyYandexS3({
            auth: {
                accessKeyId: this.ACCESS,
                secretAccessKey: this.SECRET
            },
            Bucket: this.BUCKET,
            debug: false
        });
    }

    private generateUrlsWithMainFirst(data) {
        const { Contents } = data;

        return Contents.map(
            link => `https://${this.BUCKET}.storage.yandexcloud.net/${link.Key}`
        );
    }
}
