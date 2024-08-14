# AutoFollowSingleUser

**AutoFollowSingleUser** is a BetterDiscord plugin that allows you to automatically follow a single user at a time in voice channels. When you follow a user, the plugin will automatically move you to the same voice channel as the followed user. If you choose to follow another user, the previous user’s follow will be stopped.

## Features

- Automatically follow a user when they enter a voice channel.
- Option to follow or unfollow a user via the context menu.
- Supports only one user being followed at a time.

## Installation

1. **Install BetterDiscord**: Ensure BetterDiscord is installed on your Discord client. You can download BetterDiscord from the [official website](https://betterdiscord.app/).

2. **Download the Plugin**:
   - Download the `AutoFollowSingleUser.plugin.js` file from the [GitHub repository](https://github.com/d3v-me/AutoFollowUser).

3. **Place the Plugin**:
   - Move the `.js` file to the BetterDiscord plugins folder:
     - **Windows**: `%appdata%/BetterDiscord/plugins`
     - **macOS**: `~/Library/Application Support/BetterDiscord/plugins`
     - **Linux**: `~/.config/BetterDiscord/plugins`

4. **Enable the Plugin**:
   - Open Discord, go to BetterDiscord settings (via the gear icon at the bottom left), then click on "Plugins".
   - Enable the `AutoFollowSingleUser` plugin from the list of available plugins.

## Usage

1. **Open Context Menu**:
   - Right-click on a user in the member list or in a voice channel to open the context menu.

2. **Follow a User**:
   - Select "Follow this user" to start following the selected user.
   - If another user is already being followed, the previous follow will be automatically stopped.

3. **Stop Following a User**:
   - Click again on "Unfollow this user" in the context menu to stop following the current user.

## Configuration

No additional configuration is required. The plugin works immediately after activation.

## Known Issues

- **Privacy**: Make sure to obtain consent from users you wish to follow to avoid privacy issues.
- **Compatibility**: This plugin is designed to work with current versions of BetterDiscord and Discord. Updates to Discord may require adjustments to the plugin.

## Contributing

If you want to contribute to the development of this plugin, feel free to submit issues or pull requests on the [GitHub repository](https://github.com/d3v-me/AutoFollowUser/blob/main/FollowUser.plugin.js). Any help is appreciated!

## License

This plugin is distributed under the MIT License.

---

**Note**: The use of this plugin may be subject to Discord’s and BetterDiscord’s terms of service. Use it responsibly.

