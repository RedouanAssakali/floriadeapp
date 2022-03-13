<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'gardenofpeace' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '|B.Uy#+ssm:7KDj|etUm1xGF3(kG[wNnS17Yi~]3B&:i~1p>DYKy+s#e2:o `8n2' );
define( 'SECURE_AUTH_KEY',  'K@=, &fX=O$D.G)y#[eH `*%gBcA`R[@w]V{/Y1P;9U!$=lzeud7`}G)o4_~]{*>' );
define( 'LOGGED_IN_KEY',    't(9sU&i},v(aP6x_cwa7}#~k7x!3jnY+vAiaStilOX8?t/LmBq{!yoj_I^sI`&^X' );
define( 'NONCE_KEY',        'G/zeEOAxwj{@;;lF}Uq,i0;bFycrFp;3o `hPi* ?4i9]%Aqm0NuppG{[qttbh!&' );
define( 'AUTH_SALT',        'F=O1LPh57Z.)P-*yx5%N;5/cd-)-gdeBqP0-UCX_FA6b4/=hmUz5E_qno9Ro#]*x' );
define( 'SECURE_AUTH_SALT', 'S(WiP VDpIxEj})Ln4cafz%%v#Gq16wH@~R<I(Z>20:SF$C 7|CZm|c:B&9# sfH' );
define( 'LOGGED_IN_SALT',   'Um<ZyQOl?nG:1Tu@B^*BQ&DJM,6cEdZiB;#<If>k*s2QhCxp`]mIg}P0h4]t>.x2' );
define( 'NONCE_SALT',       'zG;=b20zvjM*_lXX<?UJ/~e,2HERPiia, Y9C~_bH}]&I~T5lF$!GuHZqvp9up,u' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
