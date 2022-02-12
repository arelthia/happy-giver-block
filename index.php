<?php
/**
 * @link              https://pintopsolutions.com/happy-giver-block
 * @since             1.0.0
 * @package           Happy_Giver_Block
 *
 * @wordpress-plugin
 * Plugin Name:       Happy Giver Block
 * Plugin URI:        https://pintopsolutions.com/happy-giver-block
 * Description:       Make donations. Giver happily stays on your site. 
 * Version:           1.0.0
 * Author:            Arelthia Phillips
 * Author URI:        https://arelthiaphillips.com
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       hgb
 * Domain Path:       /languages
 */

if( ! defined( 'ABSPATH' ) ) exit;

class HappyGiverBlock {
    function __construct() {
        add_action( 'init', array($this, 'adminAssets'));
    }

    function adminAssets() {
        wp_register_style('happygiverblockcss', plugin_dir_url(__FILE__) . 'build/index.css' );
        wp_register_script('happygiverblocktype', plugin_dir_url(__FILE__) . 'build/index.js', array('wp-blocks', 'wp-element', 'wp-editor'), '11', false);
        register_block_type('happygiverblock/happy-giver', array(
            'editor_script' => 'happygiverblocktype',
            'editor_style' => 'happygiverblockcss',
            'render_callback' => array($this, 'theHTML') 
        ));
    }

    function theHTML($attributes) {
        /*return '<div><p>How much you want to give?</p> <span>'. $attributes['giverAmount'] . '</span><p>What is the purpose?</p><span>' . $attributes['giverPurpose'] . '</span></div>';*/
        ob_start(); ?>
        <div>
            <p>How much you want to give?</p> 
            <span><?php echo $attributes['giverAmount'] ?></span>
            <p>What is the purpose?</p>
            <span><?php echo $attributes['giverPurpose'] ?></span>
        </div>
        <?php return ob_get_clean();
    }
}

$happyGiverBlock = new HappyGiverBlock();

/**
 * amounts horizontal radio like custon
 * Information ??
 * Purpose horizontal radio like
 * Donate button
 */