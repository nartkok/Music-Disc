import { Client, ClientPresenceStatus } from 'discord.js';
import { getSysInfo } from '../../utils/functions/getSysInfo.js';
import { cst } from '../../utils/constants.js';

import type { Bot } from '../../@types/index.js';


export default async (bot: Bot, client: Client) => {
    bot.sysInfo = await getSysInfo();

    const release = {
        bot: `${bot.config.bot.name}: ${cst.color.cyan}${bot.sysInfo.bot_version}${cst.color.white}`,
        nodejs: `Node.js:    ${cst.color.cyan}${bot.sysInfo.node_version}${cst.color.white}`,
        djs: `Discord.js: ${cst.color.cyan}${bot.sysInfo.dc_version}${cst.color.white}`,
        shark: `LavaShark:  ${cst.color.cyan}${bot.sysInfo.shark_version}${cst.color.white}`,
    };

    bot.logger.emit('log', bot.shardId, `+-----------------------+`);
    bot.logger.emit('log', bot.shardId, `| ${release.bot.padEnd(30, ' ')} |`);
    bot.logger.emit('log', bot.shardId, `| ${release.nodejs.padEnd(30, ' ')} |`);
    bot.logger.emit('log', bot.shardId, `| ${release.djs.padEnd(30, ' ')} |`);
    bot.logger.emit('log', bot.shardId, `| ${release.shark.padEnd(30, ' ')} |`);
    bot.logger.emit('log', bot.shardId, `+-----------------------+`);


    if (bot.config.bot.slashCommand) {
        bot.logger.emit('log', bot.shardId, 'Enable slash command.');
        client.application?.commands.set(client.commands.map(cmd => {
            return {
                name: cmd.name,
                description: cmd.description,
                options: cmd.options
            };
        }));
    }
    else {
        bot.logger.emit('log', bot.shardId, 'Disable slash command.');
    }


    client.lavashark.start(String(client.user?.id));
    client.user?.setStatus(bot.config.bot.status as ClientPresenceStatus);
    client.user?.setActivity({
        name: bot.config.bot.activity.name,
        type: bot.config.bot.activity.type,
        state: bot.config.bot.activity.state,
        url: bot.config.bot.activity.url
    });

    // Prevent the disappearance of the activity status
    setInterval(() => {
        client.user?.setActivity({
            name: bot.config.bot.activity.name,
            type: bot.config.bot.activity.type,
            state: bot.config.bot.activity.state,
            url: bot.config.bot.activity.url
        });
    }, 10 * 60 * 1000); // 10 minutes


    // Specify message channel ID
    if (bot.config.bot.specifyMessageChannel) {
        const channel = await client.channels.fetch(bot.config.bot.specifyMessageChannel);

        if (!channel) {
            bot.config.bot.specifyMessageChannel = null;
        }
        else {
            bot.logger.emit('log', bot.shardId, `Set specify message channel : ${(channel as any).name || 'Unknown channel'} (${bot.config.bot.specifyMessageChannel})`);
        }
    }

    bot.logger.emit('log', bot.shardId, `Set admin as user ID : ${JSON.stringify(bot.config.bot.admin)}`);
    bot.logger.emit('discord', bot.shardId, `>>> Logged in as ${client.user?.username}`);


    bot.logger.emit('log', bot.shardId, `${cst.color.green}*** Launched shard ${bot.shardId + 1} / ${client.shard?.count} ***${cst.color.white}`);
};