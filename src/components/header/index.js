import React from "react"
import { Link } from 'gatsby';
import headerStyle from './index.module.css';

export default (props) => {
  const options = props.data || {};

  return (
    <header className={headerStyle.myHeader}
            style={{backgroundColor: `rgba(0, 0, 0, ${options.opacity || '0.8'})`}}>
      <div className={headerStyle.myHeaderContent}>
        <Link to='/'>
          <svg xmlns="http://www.w3.org/2000/svg" id="canvas" version="1.1"
               baseProfile="full"
               width="120" height="50" viewBox="135 54.64 83.70 92.96">
            <path
              d="M 473.72,439.09 C 472.83 437.96, 471.58 436.55, 468.60 436.26 C 465.62 435.97, 463.52 436.38, 458.81 437.64 C 454.10 438.89, 450.96 439.41, 445.05 442.55 C 439.13 445.69, 435.59 448.26, 429.22 453.34 C 422.86 458.43, 419.06 461.75, 413.21 467.97 C 407.36 474.19, 404.16 477.99, 399.97 484.43 C 395.78 490.88, 393.85 494.41, 392.25 500.20 C 390.64 505.99, 390.19 508.79, 391.94 513.38 C 393.70 517.97, 395.72 519.95, 401.01 523.13 C 406.30 526.31, 410.37 527.66, 418.39 529.27 C 426.42 530.89, 431.35 531.11, 441.13 531.20 C 450.92 531.29, 457.33 530.74, 467.34 529.72 C 477.35 528.71, 482.45 527.98, 491.19 526.12 C 499.93 524.26, 504.28 522.67, 511.03 520.41 C 517.79 518.15, 520.67 516.84, 524.96 514.81 C 529.26 512.77, 531.20 511.54, 532.50 510.25 C 533.80 508.95, 533.22 507.96, 531.46 508.32 C 529.70 508.68, 527.96 510.14, 523.69 512.04 C 519.43 513.94, 516.74 515.47, 510.14 517.81 C 503.53 520.16, 499.29 521.86, 490.68 523.78 C 482.07 525.70, 477.01 526.42, 467.11 527.40 C 457.20 528.38, 450.80 528.87, 441.17 528.68 C 431.54 528.50, 426.68 528.14, 418.97 526.49 C 411.26 524.84, 407.43 523.28, 402.63 520.42 C 397.82 517.57, 396.43 516.11, 394.95 512.23 C 393.47 508.35, 393.73 506.28, 395.22 501.03 C 396.70 495.78, 398.37 492.22, 402.37 485.99 C 406.38 479.76, 409.50 475.94, 415.25 469.90 C 420.99 463.85, 424.82 460.55, 431.11 455.76 C 437.41 450.97, 440.98 448.59, 446.72 445.93 C 452.47 443.28, 455.52 443.18, 459.86 442.49 C 464.20 441.80, 465.76 442.59, 468.41 442.47 C 471.05 442.36, 472.00 442.59, 473.07 441.92 C 474.13 441.24, 474.61 440.23, 473.72 439.09"
             style={{strokeWidth: '15', stroke: 'white', fill: 'white', transform: 'scale(.2)'}}/>
            <path
              d="M 590.44,463.17 C 589.82 461.78, 588.77 460.18, 586.02 458.99 C 583.27 457.80, 580.94 457.32, 576.68 457.21 C 572.43 457.10, 569.70 457.15, 564.74 458.44 C 559.77 459.74, 556.81 460.69, 551.86 463.67 C 546.90 466.65, 544.29 468.94, 539.97 473.35 C 535.64 477.75, 533.18 480.70, 530.25 485.70 C 527.32 490.70, 525.93 493.63, 525.31 498.36 C 524.68 503.09, 525.20 505.72, 527.11 509.35 C 529.02 512.98, 531.12 514.57, 534.85 516.50 C 538.58 518.44, 541.05 518.79, 545.75 519.02 C 550.44 519.24, 553.33 518.85, 558.33 517.62 C 563.33 516.38, 566.20 515.43, 570.74 512.84 C 575.29 510.24, 577.42 508.48, 581.06 504.66 C 584.70 500.84, 586.39 498.24, 588.96 493.73 C 591.52 489.22, 592.54 486.42, 593.89 482.09 C 595.24 477.76, 595.81 474.85, 595.71 472.07 C 595.62 469.29, 594.27 468.09, 593.42 468.19 C 592.58 468.29, 591.27 469.76, 591.47 472.56 C 591.67 475.36, 592.76 477.86, 594.42 482.18 C 596.09 486.50, 597.31 489.72, 599.79 494.16 C 602.27 498.60, 603.73 500.73, 606.82 504.37 C 609.91 508.01, 611.72 509.71, 615.25 512.35 C 618.78 515.00, 620.75 516.04, 624.47 517.58 C 628.19 519.12, 630.16 519.86, 633.84 520.05 C 637.52 520.24, 639.55 519.92, 642.89 518.55 C 646.23 517.18, 648.00 516.02, 650.54 513.19 C 653.07 510.36, 653.89 508.30, 655.56 504.41 C 657.23 500.51, 657.65 498.02, 658.87 493.73 C 660.10 489.44, 660.66 486.90, 661.69 482.94 C 662.71 478.97, 663.69 476.43, 664.00 473.92 C 664.31 471.42, 663.27 470.27, 663.25 470.39 C 663.22 470.51, 662.80 471.95, 663.88 474.51 C 664.96 477.07, 666.42 479.15, 668.65 483.17 C 670.88 487.18, 672.32 490.08, 675.02 494.58 C 677.72 499.08, 679.30 501.82, 682.16 505.66 C 685.02 509.51, 686.46 511.23, 689.33 513.80 C 692.19 516.37, 693.55 517.44, 696.49 518.52 C 699.44 519.60, 701.14 519.77, 704.05 519.20 C 706.96 518.62, 708.67 518.10, 711.05 515.66 C 713.43 513.22, 713.92 510.91, 715.96 506.98 C 717.99 503.05, 719.31 500.55, 721.23 496.00 C 723.16 491.45, 723.88 488.30, 725.58 484.24 C 727.28 480.17, 728.58 478.15, 729.73 475.70 C 730.87 473.25, 730.97 472.12, 731.30 471.99 C 731.62 471.85, 730.62 472.89, 731.35 475.02 C 732.09 477.15, 733.27 479.00, 734.97 482.63 C 736.68 486.26, 737.85 489.10, 739.87 493.17 C 741.88 497.23, 743.06 499.42, 745.06 502.97 C 747.05 506.52, 747.87 508.39, 749.84 510.92 C 751.81 513.44, 752.74 514.41, 754.91 515.59 C 757.08 516.77, 758.19 517.05, 760.70 516.82 C 763.20 516.60, 764.88 516.32, 767.45 514.46 C 770.01 512.60, 771.03 510.71, 773.54 507.53 C 776.04 504.34, 777.30 502.20, 779.97 498.53 C 782.65 494.86, 784.40 492.62, 786.93 489.19 C 789.46 485.76, 791.03 483.65, 792.63 481.39 C 794.24 479.13, 794.08 478.15, 794.95 477.90 C 795.82 477.66, 795.87 478.57, 796.99 480.15 C 798.10 481.74, 798.72 482.94, 800.51 485.84 C 802.30 488.73, 803.47 491.05, 805.94 494.65 C 808.42 498.24, 810.00 500.53, 812.88 503.80 C 815.77 507.07, 817.24 508.34, 820.36 510.99 C 823.48 513.64, 824.93 515.08, 828.48 517.05 C 832.04 519.02, 834.15 519.77, 838.13 520.82 C 842.11 521.88, 844.16 522.17, 848.38 522.32 C 852.60 522.47, 854.96 522.39, 859.24 521.57 C 863.53 520.74, 865.73 520.19, 869.80 518.20 C 873.88 516.21, 875.98 514.76, 879.61 511.63 C 883.25 508.49, 885.18 506.54, 887.98 502.52 C 890.78 498.50, 892.00 496.00, 893.62 491.53 C 895.24 487.05, 895.89 484.46, 896.08 480.16 C 896.28 475.85, 896.12 473.52, 894.59 469.99 C 893.07 466.46, 891.53 464.59, 888.46 462.53 C 885.39 460.47, 883.09 459.74, 879.26 459.69 C 875.44 459.64, 873.09 460.36, 869.33 462.27 C 865.57 464.18, 863.41 465.75, 860.46 469.26 C 857.51 472.76, 855.92 475.14, 854.57 479.80 C 853.23 484.47, 852.97 487.54, 853.72 492.59 C 854.47 497.64, 855.51 500.45, 858.32 505.06 C 861.13 509.68, 862.91 512.07, 867.77 515.65 C 872.64 519.22, 876.24 520.78, 882.64 522.95 C 889.03 525.12, 892.69 525.63, 899.75 526.49 C 906.81 527.36, 910.46 527.63, 917.94 527.29 C 925.41 526.96, 929.88 526.52, 937.13 524.83 C 944.38 523.13, 947.99 521.80, 954.17 518.82 C 960.34 515.85, 963.11 514.08, 967.99 509.96 C 972.87 505.84, 975.22 503.34, 978.56 498.23 C 981.90 493.12, 983.10 490.09, 984.69 484.40 C 986.28 478.72, 986.46 475.34, 986.51 469.79 C 986.56 464.23, 986.19 461.25, 984.95 456.63 C 983.71 452.00, 982.80 449.17, 980.29 446.68 C 977.79 444.18, 975.10 443.12, 972.42 444.14 C 969.74 445.17, 968.37 447.37, 966.90 451.82 C 965.43 456.26, 964.98 459.80, 965.06 466.36 C 965.14 472.92, 965.63 477.45, 967.29 484.63 C 968.95 491.80, 970.17 495.80, 973.34 502.22 C 976.51 508.64, 978.90 511.80, 983.14 516.74 C 987.38 521.68, 989.92 523.52, 994.53 526.92 C 999.15 530.32, 1001.90 531.56, 1006.21 533.75 C 1010.53 535.94, 1012.73 537.01, 1016.10 537.87 C 1019.47 538.74, 1020.97 538.32, 1023.07 538.08 C 1025.18 537.84, 1025.93 537.33, 1026.63 536.67 C 1027.32 536.02, 1027.20 535.39, 1026.54 534.80 C 1025.87 534.20, 1025.11 534.14, 1023.28 533.72 C 1021.46 533.29, 1020.48 533.42, 1017.41 532.66 C 1014.35 531.91, 1012.13 531.67, 1007.97 529.95 C 1003.80 528.23, 1001.05 527.11, 996.57 524.05 C 992.08 520.99, 989.62 519.29, 985.54 514.65 C 981.46 510.01, 979.15 506.99, 976.17 500.84 C 973.19 494.69, 972.07 490.78, 970.66 483.89 C 969.25 477.00, 968.98 472.53, 969.12 466.38 C 969.26 460.23, 970.40 456.91, 971.37 453.14 C 972.34 449.37, 972.95 448.16, 973.95 447.53 C 974.94 446.90, 975.03 447.91, 976.36 449.98 C 977.69 452.05, 979.35 453.92, 980.60 457.89 C 981.86 461.86, 982.50 464.70, 982.64 469.82 C 982.77 474.93, 982.64 478.16, 981.26 483.48 C 979.89 488.80, 978.82 491.61, 975.76 496.43 C 972.70 501.25, 970.54 503.64, 965.96 507.58 C 961.38 511.52, 958.75 513.24, 952.85 516.12 C 946.95 518.99, 943.47 520.31, 936.46 521.96 C 929.45 523.61, 925.07 524.06, 917.81 524.35 C 910.55 524.64, 906.96 524.34, 900.14 523.42 C 893.33 522.51, 889.77 521.91, 883.74 519.77 C 877.70 517.63, 874.36 516.07, 869.96 512.72 C 865.56 509.37, 864.13 507.17, 861.75 503.03 C 859.37 498.88, 858.59 496.37, 858.07 492.00 C 857.54 487.63, 857.86 485.06, 859.12 481.19 C 860.37 477.32, 861.82 475.44, 864.36 472.66 C 866.90 469.88, 868.84 468.71, 871.82 467.28 C 874.79 465.86, 876.51 465.52, 879.21 465.53 C 881.91 465.54, 883.21 466.01, 885.30 467.34 C 887.38 468.67, 888.48 469.65, 889.64 472.18 C 890.79 474.71, 891.16 476.42, 891.07 479.97 C 890.97 483.52, 890.53 485.96, 889.16 489.94 C 887.78 493.93, 886.70 496.25, 884.19 499.88 C 881.67 503.51, 879.87 505.29, 876.58 508.08 C 873.28 510.87, 871.36 512.13, 867.71 513.84 C 864.06 515.55, 862.16 515.96, 858.34 516.62 C 854.51 517.28, 852.36 517.31, 848.59 517.13 C 844.81 516.96, 842.98 516.68, 839.46 515.76 C 835.94 514.84, 834.13 514.26, 830.97 512.53 C 827.82 510.81, 826.49 509.56, 823.68 507.12 C 820.88 504.68, 819.51 503.48, 816.96 500.34 C 814.41 497.21, 813.10 495.04, 810.92 491.43 C 808.74 487.83, 808.07 485.42, 806.08 482.32 C 804.09 479.22, 803.32 477.64, 800.97 475.95 C 798.61 474.25, 796.89 473.54, 794.30 473.84 C 791.71 474.15, 790.41 475.05, 788.03 477.47 C 785.65 479.89, 784.91 482.39, 782.42 485.93 C 779.92 489.47, 778.29 491.69, 775.55 495.18 C 772.80 498.67, 771.26 500.67, 768.71 503.38 C 766.16 506.09, 764.61 507.02, 762.79 508.72 C 760.97 510.42, 760.62 511.33, 759.60 511.89 C 758.57 512.45, 758.61 512.46, 757.67 511.52 C 756.73 510.59, 756.44 509.48, 754.89 507.21 C 753.34 504.94, 751.87 503.48, 749.92 500.17 C 747.97 496.86, 746.99 494.70, 745.16 490.66 C 743.32 486.61, 742.50 483.68, 740.74 479.93 C 738.98 476.18, 738.32 474.09, 736.37 471.90 C 734.42 469.71, 733.33 468.84, 731.00 468.97 C 728.67 469.10, 726.79 469.89, 724.72 472.55 C 722.66 475.21, 722.33 477.99, 720.67 482.26 C 719.02 486.54, 718.38 489.53, 716.45 493.93 C 714.51 498.34, 713.00 500.78, 710.98 504.27 C 708.97 507.76, 707.97 509.46, 706.37 511.39 C 704.76 513.32, 704.53 513.56, 702.96 513.91 C 701.39 514.26, 700.57 513.95, 698.53 513.14 C 696.48 512.33, 695.23 511.94, 692.73 509.87 C 690.22 507.80, 688.67 506.35, 686.01 502.79 C 683.34 499.23, 681.85 496.51, 679.39 492.06 C 676.93 487.61, 675.76 484.68, 673.70 480.52 C 671.65 476.36, 671.20 473.78, 669.11 471.25 C 667.01 468.72, 665.43 467.72, 663.22 467.86 C 661.01 468.01, 659.47 469.20, 658.04 471.96 C 656.61 474.71, 656.95 477.55, 656.09 481.62 C 655.23 485.69, 654.87 488.19, 653.75 492.30 C 652.64 496.42, 652.01 498.81, 650.51 502.21 C 649.01 505.62, 648.22 507.15, 646.24 509.32 C 644.27 511.50, 643.07 512.09, 640.63 513.10 C 638.20 514.12, 636.93 514.47, 634.07 514.40 C 631.22 514.32, 629.58 513.90, 626.38 512.72 C 623.17 511.54, 621.25 510.77, 618.06 508.51 C 614.86 506.24, 613.13 504.74, 610.40 501.38 C 607.68 498.03, 606.47 495.99, 604.42 491.75 C 602.38 487.50, 601.53 484.33, 600.17 480.14 C 598.80 475.95, 598.93 473.35, 597.59 470.80 C 596.24 468.24, 594.99 467.29, 593.44 467.37 C 591.89 467.45, 590.71 468.54, 589.83 471.22 C 588.94 473.90, 589.95 476.68, 589.02 480.77 C 588.09 484.86, 587.37 487.46, 585.18 491.67 C 582.98 495.87, 581.35 498.31, 578.05 501.79 C 574.74 505.28, 572.80 506.82, 568.65 509.09 C 564.49 511.37, 561.81 512.14, 557.28 513.16 C 552.74 514.19, 550.03 514.40, 545.97 514.21 C 541.92 514.02, 539.97 513.61, 536.99 512.20 C 534.01 510.80, 532.60 509.85, 531.09 507.19 C 529.59 504.53, 528.95 502.81, 529.46 498.91 C 529.98 495.01, 531.00 492.25, 533.65 487.68 C 536.30 483.11, 538.65 480.14, 542.71 476.05 C 546.76 471.96, 549.29 469.79, 553.91 467.22 C 558.53 464.64, 561.33 464.00, 565.80 463.18 C 570.27 462.36, 572.65 462.65, 576.27 463.09 C 579.89 463.54, 581.33 464.84, 583.90 465.40 C 586.46 465.97, 587.79 466.36, 589.10 465.92 C 590.41 465.47, 591.06 464.56, 590.44 463.17"
              style={{strokeWidth: '15', stroke: 'white', fill: 'white', transform: 'scale(.2)'}}/>
            <path
              d="M 1222.24,490.03 C 1222.36 491.48, 1223.13 492.68, 1225.07 495.36 C 1227.01 498.05, 1228.60 499.70, 1231.95 503.45 C 1235.29 507.21, 1237.77 509.98, 1241.80 514.14 C 1245.84 518.30, 1247.93 520.70, 1252.12 524.25 C 1256.30 527.79, 1258.56 529.34, 1262.72 531.86 C 1266.87 534.39, 1268.86 535.70, 1272.89 536.87 C 1276.91 538.04, 1279.07 538.25, 1282.84 537.72 C 1286.61 537.19, 1288.45 536.32, 1291.74 534.21 C 1295.04 532.11, 1296.80 530.65, 1299.31 527.20 C 1301.81 523.75, 1302.71 521.34, 1304.28 516.95 C 1305.86 512.56, 1306.22 509.93, 1307.16 505.26 C 1308.11 500.59, 1308.87 497.88, 1309.01 493.58 C 1309.16 489.28, 1309.16 486.41, 1307.88 483.75 C 1306.60 481.09, 1304.56 480.23, 1302.61 480.28 C 1300.66 480.33, 1299.06 481.41, 1298.15 483.99 C 1297.24 486.57, 1297.40 488.48, 1298.06 493.18 C 1298.72 497.88, 1299.58 501.22, 1301.46 507.48 C 1303.34 513.74, 1304.88 517.32, 1307.46 524.46 C 1310.04 531.61, 1311.41 535.69, 1314.37 543.19 C 1317.32 550.68, 1319.39 554.58, 1322.25 561.93 C 1325.12 569.29, 1326.59 573.16, 1328.70 579.97 C 1330.81 586.77, 1331.72 589.98, 1332.81 595.96 C 1333.90 601.93, 1334.38 605.04, 1334.16 609.82 C 1333.95 614.60, 1333.61 616.55, 1331.73 619.85 C 1329.85 623.16, 1328.44 624.19, 1324.76 626.33 C 1321.09 628.47, 1318.64 629.38, 1313.36 630.56 C 1308.08 631.74, 1304.99 632.08, 1298.35 632.25 C 1291.70 632.43, 1287.49 632.22, 1280.14 631.43 C 1272.80 630.65, 1268.68 630.12, 1261.63 628.33 C 1254.58 626.54, 1251.15 625.45, 1244.90 622.49 C 1238.64 619.54, 1235.06 617.50, 1230.37 613.55 C 1225.68 609.60, 1223.67 607.04, 1221.44 602.72 C 1219.21 598.40, 1219.06 596.47, 1219.24 591.94 C 1219.42 587.41, 1220.04 584.94, 1222.35 580.08 C 1224.67 575.23, 1226.44 572.43, 1230.80 567.68 C 1235.16 562.94, 1238.34 560.77, 1244.16 556.34 C 1249.97 551.92, 1253.47 549.52, 1259.88 545.55 C 1266.29 541.58, 1269.48 539.76, 1276.20 536.49 C 1282.91 533.22, 1290.22 531.17, 1293.46 529.21 C 1296.70 527.25, 1296.10 525.73, 1292.40 526.69 C 1288.71 527.64, 1281.79 530.71, 1274.99 533.99 C 1268.18 537.28, 1264.91 539.13, 1258.38 543.11 C 1251.84 547.09, 1248.32 549.43, 1242.31 553.89 C 1236.31 558.35, 1232.99 560.48, 1228.35 565.41 C 1223.72 570.34, 1221.69 573.27, 1219.15 578.55 C 1216.61 583.83, 1215.83 586.66, 1215.67 591.82 C 1215.52 596.97, 1215.85 599.48, 1218.38 604.31 C 1220.91 609.15, 1223.27 611.83, 1228.32 616.00 C 1233.38 620.18, 1237.13 622.14, 1243.64 625.17 C 1250.16 628.20, 1253.67 629.30, 1260.90 631.17 C 1268.14 633.04, 1272.29 633.61, 1279.79 634.51 C 1287.29 635.41, 1291.53 635.70, 1298.40 635.65 C 1305.28 635.60, 1308.47 635.43, 1314.15 634.26 C 1319.83 633.09, 1322.60 632.29, 1326.80 629.80 C 1331.01 627.30, 1332.99 625.75, 1335.18 621.78 C 1337.37 617.81, 1337.61 615.24, 1337.75 609.95 C 1337.90 604.67, 1337.18 601.52, 1335.91 595.35 C 1334.65 589.18, 1333.65 585.99, 1331.43 579.11 C 1329.21 572.22, 1327.70 568.32, 1324.82 560.93 C 1321.93 553.54, 1319.86 549.67, 1317.00 542.17 C 1314.13 534.66, 1312.81 530.57, 1310.48 523.42 C 1308.16 516.28, 1306.79 512.61, 1305.37 506.44 C 1303.95 500.27, 1303.75 496.89, 1303.39 492.57 C 1303.03 488.26, 1303.74 486.89, 1303.57 484.85 C 1303.39 482.82, 1302.79 482.27, 1302.52 482.40 C 1302.24 482.52, 1302.00 483.25, 1302.19 485.47 C 1302.38 487.68, 1303.46 489.72, 1303.48 493.49 C 1303.49 497.26, 1303.06 499.97, 1302.28 504.32 C 1301.49 508.67, 1301.00 511.29, 1299.56 515.24 C 1298.11 519.19, 1297.20 521.19, 1295.05 524.08 C 1292.91 526.97, 1291.43 527.99, 1288.83 529.70 C 1286.22 531.41, 1284.97 532.10, 1282.03 532.62 C 1279.10 533.15, 1277.56 533.22, 1274.14 532.34 C 1270.71 531.46, 1268.75 530.46, 1264.89 528.22 C 1261.02 525.97, 1258.77 524.53, 1254.80 521.11 C 1250.84 517.68, 1248.86 515.27, 1245.06 511.08 C 1241.26 506.89, 1238.94 504.03, 1235.80 500.17 C 1232.67 496.31, 1231.66 494.20, 1229.40 491.79 C 1227.13 489.37, 1225.90 488.46, 1224.47 488.11 C 1223.03 487.76, 1222.12 488.58, 1222.24 490.03"
              style={{strokeWidth: '15', stroke: 'white', fill: 'white', transform: 'scale(.2)'}}/>
            <path
              d="M 1390.18,402.61 C 1388.98 403.81, 1387.94 405.85, 1387.28 409.21 C 1386.63 412.57, 1386.89 415.54, 1386.93 419.42 C 1386.97 423.30, 1386.66 425.65, 1387.50 428.60 C 1388.34 431.54, 1389.89 433.19, 1391.12 434.15 C 1392.36 435.11, 1393.09 434.72, 1393.68 433.42 C 1394.27 432.12, 1394.05 430.48, 1394.07 427.66 C 1394.08 424.84, 1393.82 422.90, 1393.76 419.32 C 1393.69 415.74, 1393.81 412.98, 1393.73 409.76 C 1393.64 406.53, 1394.03 404.64, 1393.32 403.21 C 1392.61 401.78, 1391.39 401.41, 1390.18 402.61"
              style={{strokeWidth: '15', stroke: 'white', fill: 'white', transform: 'scale(.2)'}}/>
          </svg>
        </Link>
        <div>
          <Link to="/showCase/">案例</Link>
          <Link to="https://github.com/camelys624">Github</Link>
        </div>
      </div>
    </header>
  )
}